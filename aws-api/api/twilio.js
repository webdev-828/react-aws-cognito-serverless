const qs = require('querystring');
const AWS = require('aws-sdk');
const _ = require('lodash');
const middy = require('./middy');
const hasuraClient = require('../lib/hasuraClient');
const {
  createAudioComposition,
  createRoomComposition,
  createVideoComposition,
  uploadCompositionToS3,
  getCompositionDetails,
  getVideoToken,
  createSMS
} = require('../lib/twilio');

const TWILIO_QUEUE_URL = process.env.TWILIO_QUEUE_URL;
const ROOM_CREATED = 'room-created';
const RECORDING_COMPLETE = 'recording-completed';
const COMPOSITION_AVAILABLE = 'composition-available';
const sqs = new AWS.SQS();

const insertConfQuery = `
  mutation insert_conf($input: conference_insert_input!) {
    insert_conference(objects: [ $input]) {
      returning {
        id
      }
    }
  }
`;

exports.sendTextMessage = middy(async (req) => {
  const resp = await createSMS(req.body.toNumber, req.body.smsText);
  console.log(resp);
  return {
    success: true
  };
});

exports.getVideoToken = middy(async(req) => {
  const identity = req.user.sub;
  const room = req.body.room;
  return {
    token: getVideoToken(identity, room)
  }
});

exports.roomStatusWebhook = middy(async (req) => {
  try {
    const { body } = req;
    console.log('request body: ', body);
    if (body.StatusCallbackEvent === ROOM_CREATED) {
      await createRoomComposition(body.RoomSid);
      return {
        success: true,
      };
    } else if (body.StatusCallbackEvent === RECORDING_COMPLETE) {
      if (body.Container === 'mkv') {
        await createVideoComposition(body);
      } else if (body.Container === 'mka') {
        await createAudioComposition(body);
      }
      return {
        success: true,
      };
    }
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: true,
    };
  }
});

exports.compositionWebhook = middy(async (req, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = true;
    const { body } = req;
    console.log(body);
    if (body.StatusCallbackEvent === COMPOSITION_AVAILABLE) {
      console.log('Queue message');
      await sqs
        .sendMessage({
          QueueUrl: TWILIO_QUEUE_URL,
          MessageBody: JSON.stringify(body),
        })
        .promise();
      return {
        success: true,
      };
    }
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: true,
    };
  }
});

exports.handleQueue = async (event, context, callback) => {
  try {
    const Records = event.Records;
    for (const record of Records) {
      const payload = JSON.parse(record.body);
      await handleCompositionEvent(payload);
      callback(null, 'Job completed');
    }
  } catch (e) {
    console.log('Queue error: ', e);
    callback(e);
  }
};

async function handleCompositionEvent(event) {
  const compositionInfo = await getCompositionDetails(event.CompositionSid);
  console.log(compositionInfo);
  // const recording = recordings.find(r => )
  const uploadKey = `${event.RoomSid}/${event.CompositionSid}.mp4`;
  console.log('upload to s3');
  const { Location } = await uploadCompositionToS3(event.CompositionUri, uploadKey);
  console.log('Update table');
  await hasuraClient.request(insertConfQuery, {
    input: {
      composition_sid: compositionInfo.sid,
      room_id: event.RoomSid,
      duration: compositionInfo.duration,
      room_name: compositionInfo.roomName,
      media_url: Location,
      is_composite: compositionInfo.isComposite,
      type: compositionInfo.type,
      conference_participants: {
        data: compositionInfo.participants.map(i => ({ user_sub: i }))
      }
    },
  });
  return true;
}

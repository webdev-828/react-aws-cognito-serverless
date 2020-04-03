const middy = require('./middy');
const AWS = require('aws-sdk');

const S3_VIDEO_BUCKET = `weadmit-videos-${process.env.STAGE}`;
const FACE_DETECTION_ROLE_ARN = 'arn:aws:iam::536335609904:role/weadmit-rekognition';

exports.facedetect = middy(async (req) => {
    if (!req.body.key) {
        return { status: 'error', message: 'Missing parameter' };
    }

    const key = req.body.key;

    const rekognition = new AWS.Rekognition();
    const sns = new AWS.SNS();
    const sqs = new AWS.SQS();
    const s3 = new AWS.S3();

    let snsTopicArn = '';
    let sqsQueueUrl = '';
    let startJobId = '';

    async function createTopicAndQueue() {
      const snsTopicName = `FaceDetection${(new Date().getTime()).toString(36)}`;
      const topicResponse = await new Promise((resolve) => {
        sns.createTopic({Name: snsTopicName}, (err, data) => { err ? console.log(err) : ''; resolve(err ? '' : data)});
      });
      console.log('topicResponse:', topicResponse);
      snsTopicArn = topicResponse ? topicResponse['TopicArn'] : '';
      if (!snsTopicArn) return false;

      const sqsQueueName = `FaceDetection${(new Date().getTime()).toString(36)}`;
      const queueResponse = await new Promise((resolve) => {
        sqs.createQueue({QueueName: sqsQueueName}, (err, data) => { err ? console.log(err) : ''; resolve(data)});
      });
      console.log('queueResponse:', queueResponse);

      const getQueueResponse = await new Promise((resolve) => {
        sqs.getQueueUrl({QueueName: sqsQueueName}, (err, data) => { err ? console.log(err) : ''; resolve(data)});
      });
      console.log('queueResponse:', getQueueResponse);
      sqsQueueUrl = getQueueResponse ? getQueueResponse['QueueUrl'] : '';
      if (!sqsQueueUrl) return false;

      const attribsResponse = await new Promise((resolve) => {
        sqs.getQueueAttributes({QueueUrl: sqsQueueUrl, AttributeNames: ['QueueArn']}, (err, data) => { err ? console.log(err) : ''; resolve(data) });
      });
      console.log('attribsResponse:', attribsResponse);
      let sqsQueueArn = attribsResponse ? attribsResponse['Attributes']['QueueArn'] : '';
      if (!sqsQueueArn) return false;

      const subscribeResponse = await new Promise((resolve) => {
        sns.subscribe({TopicArn: snsTopicArn, Protocol: 'sqs', Endpoint: sqsQueueArn}, (err, data) => { err ? console.log(err) : ''; resolve(data) });
      });
      console.log('subscribeResponse:', subscribeResponse);
      if (!subscribeResponse) return false;

      const Policy = `{
        "Version": "2012-10-17",
        "Statement":[
          {
            "Sid":"MyPolicy",
            "Effect":"Allow",
            "Principal" : {"AWS" : "*"},
            "Action":"SQS:SendMessage",
            "Resource": "${sqsQueueArn}",
            "Condition":{
              "ArnEquals":{
                "aws:SourceArn": "${snsTopicArn}"
              }
            }
          }
        ]
      }`;

      const setQueueResponse = await new Promise((resolve) => {
        sqs.setQueueAttributes({QueueUrl: sqsQueueUrl, Attributes: {Policy}}, (err, data) => { err ? console.log(err) : ''; resolve(data)});
      });
      console.log('setQueueResponse:' ,setQueueResponse);
      if (!setQueueResponse) return false;

      return true;
    }

    async function deleteTopicAndQueue() {
      if (sqsQueueUrl) await new Promise((resolve) => { sqs.deleteQueue({QueueUrl: sqsQueueUrl}, () => {resolve()}) });
      if (snsTopicArn) await new Promise((resolve) => { sns.deleteTopic({TopicArn: snsTopicArn}, () => {resolve()}) });
    }

    async function getSQSMessageSuccess() {
      let jobFound = false;
      let succeeded = false;

      while (!jobFound) {
        const sqsResponse = await new Promise((resolve) => {
          sqs.receiveMessage({QueueUrl: sqsQueueUrl, MessageAttributeNames: ['ALL'], MaxNumberOfMessages: 10}, (err, data) => {err ? console.log(err) : ''; resolve(data)})
        });
        console.log('sqsResponse:', sqsResponse);

        if (sqsResponse) {
          if (!sqsResponse.hasOwnProperty('Messages')) {
            await new Promise(r => setTimeout(r, 5000));
            continue;
          }
          for (message of sqsResponse['Messages']) {
            let notification = JSON.parse(message['Body']);
            let rekMessage = JSON.parse(notification['Message']);
            if (rekMessage['JobId'] === startJobId) {
              console.log(`Matching Job Found: ${rekMessage['JobId']}`);
              jobFound = true;
              if (rekMessage['Status'] === 'SUCCEEDED') succeeded = true;
              await new Promise((resolve) => { sqs.deleteMessage({QueueUrl: sqsQueueUrl, ReceiptHandle: message['ReceiptHandle']}, () => resolve()) });
            } else {
              console.log(`Job didn't match: ${rekMessage['JobId']} : ${startJobId}`);
              await new Promise((resolve) => { sqs.deleteMessage({QueueUrl: sqsQueueUrl, ReceiptHandle: message['ReceiptHandle']}), () => resolve() });
            }
          }
        }
      }

      return succeeded;
    }

    async function getFaceDetectionResults() {
      let maxResults = 10;
      let paginationToken = '';
      let finished = false;
      let Faces = [];

      while (!finished) {
        const response = await new Promise((resolve) => {
          rekognition.getFaceDetection({JobId: startJobId, MaxResults: maxResults, NextToken: paginationToken}, (err, data) => { err ? console.log(err) : ''; resolve(data)});
        });

        console.log('response:', response);

        console.log(`Codec: ${response['VideoMetadata']['Codec']}`);
        console.log(`Duration: ${response['VideoMetadata']['DurationMillis']}`);
        console.log(`Format: ${response['VideoMetadata']['Format']}`);
        console.log(`Frame rate: ${response['VideoMetadata']['FrameRate']}`);

        for (faceDetection of response['Faces']) {
          Faces.push(faceDetection);

          console.log(`Face: ${faceDetection['Face']}`);
          console.log(`Confidence: ${faceDetection['Face']['Confidence']}`);
          console.log(`Timestamp: ${faceDetection['Timestamp']}`);
        }

        if (response.hasOwnProperty('NextToken')) {
          paginationToken = response['NextToken'];
        } else {
          finished = true;
        }
      }

      return Faces;
    }

    async function startFaceDetection() {
      console.log({
        Video: {
          S3Object: {
            Bucket: S3_VIDEO_BUCKET,
            Name: key
          }
        },
        NotificationChannel: {
          RoleArn: FACE_DETECTION_ROLE_ARN,
          SNSTopicArn: snsTopicArn
        }
      });

      const startResponse = await new Promise((resolve) => {
        rekognition.startFaceDetection({
          Video: {
            S3Object: {
              Bucket: S3_VIDEO_BUCKET,
              Name: key
            }
          },
          NotificationChannel: {
            RoleArn: FACE_DETECTION_ROLE_ARN,
            SNSTopicArn: snsTopicArn
          }
        }, (err, data) => {
          err ? console.log(err) : '';
          resolve(data);
        });
      });

      console.log('startResponse:', startResponse);
      startJobId = startResponse ? startResponse['JobId'] : '';
    }

    await createTopicAndQueue();

    await startFaceDetection();

    const result = await getSQSMessageSuccess();

    if (result) {
      const faces = await getFaceDetectionResults();
      await new Promise((resolve) => {
        s3.putObject({
          Bucket: S3_VIDEO_BUCKET,
          Key: `${key}.json`,
          Body: new Buffer.from(JSON.stringify(faces)),
          ContentType: 'application/json'
        }, (err, data) => {
          err ? console.log(err) : '';
          resolve(data);
        });
      });
    }

    await deleteTopicAndQueue();

    return { success: result };
});

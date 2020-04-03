const middy = require('./middy');
const AWS = require('aws-sdk');

const LANGUAGE_CODE = 'en-US';
const S3_AUDIO_BUCKET = `weadmit-videos-${process.env.STAGE}`;
const S3_TRANSCRIPTION_BUCKET = `weadmit-transcriptions-${process.env.STAGE}`;

exports.transcribe = middy(async (req) => {
  const key = req.body.key;

  if (!key) {
      return { status: 'error', message: 'Missing parameter' };
  }

  const TranscriptionJobName = key.split('/').join('_');
  const transcribeService = new AWS.TranscribeService();

  const params = {
    LanguageCode: LANGUAGE_CODE,
    Media: { MediaFileUri: `https://s3.amazonaws.com/${S3_AUDIO_BUCKET}/${key}` },
    MediaFormat: `mp4`,
    TranscriptionJobName,
    OutputBucketName: `${S3_TRANSCRIPTION_BUCKET}`,
  };

  // check if the same transcription job is running
  const ret = await new Promise((resolve) => {
    transcribeService.getTranscriptionJob({ TranscriptionJobName: params.TranscriptionJobName }, function(err, data) {
      if (err) { // not found
        resolve();
      } else { // same transcription job exists
        transcribeService.deleteTranscriptionJob({ TranscriptionJobName: params.TranscriptionJobName }, function (err, data) {
          if (err) { // in progress
            resolve('it\'s in progress, please try again later...');
          } else { // deleted
            resolve();
          }
        });
      }
    });
  });

  if (ret) return { success: false, message: ret };

  return await new Promise((resolve) => {
    transcribeService.startTranscriptionJob(params, function (err, data) {
      if (err) {
        resolve({ success: false, message: JSON.stringify(err) });
      } else {
        console.log(data);
        resolve({ success: true, message: JSON.stringify(data) });
      }
    });
  });
});

exports.onTranscribed = async (event, context, callback) => {
  for (record of event.Records) {
    let key = record.s3.object.key;
    let params = {
      Bucket: record.s3.bucket.name,
      Key: key
    }
    const s3 = new AWS.S3();
    let transcriptFile = await s3.getObject(params).promise();
    let transcriptObject = JSON.parse(transcriptFile.Body.toString("utf-8"));
    let transcriptResults = transcriptObject.results.transcripts;
    let transcript = "";
    transcriptResults.forEach(result => (transcript += result.transcript + " "));

    console.log(key, transcript);
    // at this point you can post the transcript variable to your database
  }
};

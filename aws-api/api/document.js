const middy = require('./middy');
const { uploadDocument, create } = require('../services/document');

exports.create = middy(async (req) => {
  const { name } = req.body;
  const resp = await create(name, {
    sub: req.user.sub
  });
  return resp;
});

exports.upload = middy(async (req) => {
  const { url } = req.body;
  const resp = await uploadDocument(url, {
    sub: req.user.sub,
  });
  return {
    resp,
    success: true
  }
});

exports.delete = middy(async (req) => {});

exports.download = middy(async (req) => {});

exports.share = middy(async (req) => {});

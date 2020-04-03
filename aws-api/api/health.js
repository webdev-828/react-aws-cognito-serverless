const middy = require('./middy');

exports.handle = middy(async () => {
  return {
    status: 'UP'
  }
});

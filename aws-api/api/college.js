const createError = require("http-errors");
const middy = require('./middy');
const { searchByName, getCollegeById } = require('../lib/college');

exports.searchCollege = middy(async (req) => {
  const results = await searchByName(req.query.name || 'a');
  return results;
});

exports.getCollege = middy(async(req) => {
  const college = await getCollegeById(req.params.id);
  return college;
});

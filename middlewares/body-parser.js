const bodyParser = require('body-parser');
const { cleaner } = require('../utils/cleaners');

const fieldsToClean = ['name', 'link', 'email', 'image', 'keyword'];
const bodyParserOptions = {
  reviver: cleaner(fieldsToClean),
};
module.exports.bodyParser = bodyParser.json(bodyParserOptions);

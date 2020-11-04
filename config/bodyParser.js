const bodyParser = require('body-parser');

const { cleaner } = require('../utils/utils');

const fieldsToClean = ['name', 'link', 'email', 'image'];

const bodyParserOptions = {
  reviver: cleaner(fieldsToClean),
};

module.exports = bodyParser.json(bodyParserOptions);

const mongoose = require('mongoose');
const { isISO8601, isURL } = require('validator');
const {
  REQUIRED_FAIL,
  URL_FAIL,
  DATE_ISO8601_FAIL,
  KEYWORD_FAIL,
} = require('../configs/ru');
const { isKeyword } = require('../utils/validators');

const required = [true, REQUIRED_FAIL];
const requiredString = { type: String, required };

const requiredStringURL = {
  ...requiredString,
  validate: { validator: isURL, message: URL_FAIL },
};

const articleSchema = new mongoose.Schema({
  keyword: {
    ...requiredString,
    validate: {
      validator: isKeyword,
      message: KEYWORD_FAIL,
    },
  },
  title: requiredString,
  text: requiredString,
  date: {
    ...requiredString,
    validate: {
      validator: isISO8601,
      message: DATE_ISO8601_FAIL,
    },
  },
  source: requiredString,
  link: requiredStringURL,
  image: requiredStringURL,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('article', articleSchema);

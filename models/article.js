const mongoose = require('mongoose');
const { isISO8601, isURL } = require('validator');
const { requiredString, required } = require('../utils/field-props');
const { isKeyword } = require('../utils/validators');

const requiredStringURL = {
  ...requiredString,
  validate: { validator: isURL, message: 'Невалидная ссылка' },
};

const articleSchema = new mongoose.Schema({
  keyword: {
    ...requiredString,
    validate: {
      validator: isKeyword,
      message: 'Допускаются только буквы и дефисы',
    },
  },
  title: requiredString,
  text: requiredString,
  date: {
    ...requiredString,
    validate: {
      validator: isISO8601,
      message: 'Должна быть строка с датой в формате ISO 8601',
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

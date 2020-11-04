const mongoose = require('mongoose');
const { isISO8601 } = require('validator');
const { isKeyword, isUrl } = require('../utils/validators');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    validate: {
      validator: isKeyword,
      message: 'Можно только буквы и дефисы',
    },
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: isISO8601,
      message: 'Должна быть строка с датой в формате ISO 8601',
    },
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'Неправильная ссылка' },
  },
  image: {
    type: String,
    required: true,
    validate: { validator: isUrl, message: 'Неправильная ссылка' },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('article', articleSchema);

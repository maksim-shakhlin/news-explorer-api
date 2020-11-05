const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { requiredString } = require('../utils/field-props');
const { isName } = require('../utils/validators');

const userSchema = new mongoose.Schema({
  name: {
    ...requiredString,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
    validate: {
      validator: isName,
      message: 'Допускаются только буквы, пробелы и дефисы',
    },
  },
  email: {
    ...requiredString,
    unique: true,
    validate: { validator: isEmail, message: 'Невалидный email' },
  },
  password: {
    ...requiredString,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);

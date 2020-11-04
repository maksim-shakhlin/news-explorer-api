const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { isName } = require('../utils/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: isName,
      message: 'Допускаются только буквы, пробелы и дефисы',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: isEmail, message: 'Некорректный email' },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);

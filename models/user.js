const mongoose = require('mongoose');
const { isEmail } = require('validator');

const {
  EMAIL_FAIL,
  NAME_FAIL,
  REQUIRED_FAIL,
  TOO_SHORT_PATTERN,
  TOO_LONG_PATTERN,
} = require('../configs/ru');
const { formMessage } = require('../utils/message');
const { isName } = require('../utils/validators');

const requiredString = { type: String, required: [true, REQUIRED_FAIL] };

const userSchema = new mongoose.Schema({
  name: {
    ...requiredString,
    minlength: [2, formMessage(TOO_SHORT_PATTERN, { n: 2 })],
    maxlength: [30, formMessage(TOO_LONG_PATTERN, { n: 30 })],
    validate: {
      validator: isName,
      message: NAME_FAIL,
    },
  },
  email: {
    ...requiredString,
    unique: true,
    validate: { validator: isEmail, message: EMAIL_FAIL },
  },
  password: {
    ...requiredString,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);

const {
  EMAIL_FAIL,
  REQUIRED_FAIL,
  HEX_FAIL,
  DATE_ISO8601_FAIL,
  DATE_FAIL,
  LENGTH_MISMATCH_PATTERN,
  TOO_SHORT_PATTERN,
  TOO_LONG_PATTERN,
  EMPTY,
} = require('../configs/ru');
const { formMessage } = require('./message');

function getMessage(err) {
  switch (err.code) {
    case 'any.empty':
    case 'string.empty':
      return EMPTY;
    case 'any.required':
      return REQUIRED_FAIL;
    case 'any.custom':
    case 'custom':
      return err.messages.source;
    case 'string.min':
      return formMessage(TOO_SHORT_PATTERN, { n: err.local.limit });
    case 'string.max':
      return formMessage(TOO_LONG_PATTERN, { n: err.local.limit });
    case 'string.length':
      return formMessage(LENGTH_MISMATCH_PATTERN, { n: err.local.limit });
    case 'date.base':
    case 'date.format':
      return DATE_FAIL;
    case 'date.isoDate':
      return DATE_ISO8601_FAIL;
    case 'string.email':
      return EMAIL_FAIL;
    case 'string.hex':
      return HEX_FAIL;
    default:
      return '';
  }
}

function joiErrors(errors) {
  return errors.map((error) => {
    const err = error;
    const message = getMessage(error);
    err.message = message ? `${err.local.label}: ${message}` : error.message;
    return err;
  });
}

module.exports.joiCustom = (func, message) => {
  return (value, helpers) => {
    if (!func(value)) {
      return helpers.message(message);
    }
    return value;
  };
};

module.exports.enableCustomErrors = (object) => {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    newObject[key] = newObject[key].error(joiErrors);
  });
  return newObject;
};

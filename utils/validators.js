const { NAME_REGEXP, KEYWORD_REGEXP } = require('../configs/ru');

module.exports.isName = (string) => {
  return NAME_REGEXP.test(string);
};

module.exports.isKeyword = (string) => {
  return KEYWORD_REGEXP.test(string);
};

module.exports.isPassword = (string) => {
  const regExp = /^[\w!@#$%^&*()\-+=;:,./?\\|`~[\]{}<>"']*$/i;
  return regExp.test(string);
};

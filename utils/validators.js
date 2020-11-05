module.exports.isName = (string) => {
  const regExp = /^[a-zа-яё\s-]{1,}$/i;
  return regExp.test(string);
};

module.exports.isKeyword = (string) => {
  const regExp = /^[a-zа-яё-]{1,}$/i;
  return regExp.test(string);
};

module.exports.isPassword = (string) => {
  const regExp = /^[\w!@#$%^&*()\-+=;:,./?\\|`~[\]{}<>"']*$/i;
  return regExp.test(string);
};
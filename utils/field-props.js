const required = [true, 'Это поле обязательное'];
module.exports.requiredString = {
  type: String,
  required,
};
module.exports.required = required;

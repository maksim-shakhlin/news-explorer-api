const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const joiErrors = require('../utils/joi-errors');
const { isName, isPassword, isKeyword } = require('../utils/validators');

function decorateForJoi(func, message) {
  return (value, helpers) => {
    if (!func(value)) {
      return helpers.message(message);
    }
    return value;
  };
}

function joify(object) {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    newObject[key] = newObject[key].error(joiErrors);
  });
  return newObject;
}

const isUrlJoi = decorateForJoi(isURL, 'Некорректная ссылка');
const isNameJoi = decorateForJoi(
  isName,
  'Можно только буквы, пробелы и дефисы',
);
const isPasswordJoi = decorateForJoi(
  isPassword,
  'Можно латинские буквы, цифры и любые спецсимволы',
);
const isKeywordJoi = decorateForJoi(isKeyword, 'Можно только буквы и дефисы');

const _id = Joi.string().required().length(24).hex();
const str = Joi.string().required();

const id = {
  params: Joi.object().keys(
    joify({
      id: _id,
    }),
  ),
};

const article = {
  body: Joi.object().keys(
    joify({
      keyword: str.custom(isKeywordJoi),
      title: str,
      text: str,
      date: Joi.date().iso().required().raw(),
      source: str,
      link: str.custom(isUrlJoi),
      image: str.custom(isUrlJoi),
    }),
  ),
};

const authBody = joify({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).custom(isPasswordJoi),
});

const signin = {
  body: Joi.object().keys(authBody),
};

const signup = {
  body: Joi.object()
    .keys(authBody)
    .keys(
      joify({
        name: str.min(2).max(30).custom(isNameJoi),
      }),
    ),
};

const logout = {
  body: Joi.object().keys(
    joify({
      _id,
    }),
  ),
};

const json = {
  headers: Joi.object()
    .keys(
      joify({
        'content-type': Joi.string().valid('application/json').messages({
          'any.only': 'Принимается только application/json',
        }),
      }),
    )
    .unknown(true),
};

function celebratify(object) {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    newObject[key] = celebrate(newObject[key], { abortEarly: false });
  });
  return newObject;
}

module.exports = celebratify({
  validateID: id,
  validateArticle: article,
  validateSignup: signup,
  validateSignin: signin,
  isJsonContent: json,
  validateLogout: logout,
});

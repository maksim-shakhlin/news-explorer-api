const { celebrate, Joi } = require('celebrate');
const { isUrl, isName, isPassword, isKeyword } = require('./validators');

function decorateForJoi(func, message) {
  return (value, helpers) => {
    if (!func(value)) {
      return helpers.message(message);
    }
    return value;
  };
}

const isUrlJoi = decorateForJoi(isUrl, 'Некорректная ссылка');
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
  params: Joi.object().keys({
    id: _id,
  }),
};

const article = {
  body: Joi.object().keys({
    keyword: str.custom(isKeywordJoi),
    title: str,
    text: str,
    date: Joi.date().iso().required().raw(),
    source: str,
    link: str.custom(isUrlJoi),
    image: str.custom(isUrlJoi),
  }),
};

const authBody = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).custom(isPasswordJoi),
};

const signin = {
  body: Joi.object().keys(authBody),
};

const signup = {
  body: Joi.object().keys({
    ...authBody,
    name: str.min(2).max(30).custom(isNameJoi),
  }),
};

const logout = {
  body: Joi.object().keys({
    _id,
  }),
};

const json = {
  headers: Joi.object()
    .keys({
      'content-type': 'application/json',
    })
    .unknown(true),
};

module.exports = {
  idValidator: celebrate(id),
  articleValidator: celebrate(article),
  signupValidator: celebrate(signup),
  signinValidator: celebrate(signin),
  jsonValidator: celebrate(json),
  logoutValidator: celebrate(logout),
};

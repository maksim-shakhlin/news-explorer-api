const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { isName, isPassword, isKeyword } = require('../utils/validators');
const { joiCustom, enableCustomErrors } = require('../utils/joi-errors');
const {
  URL_FAIL,
  NAME_FAIL,
  PASSWORD_FAIL,
  KEYWORD_FAIL,
  JSON_CONTENT_FAIL,
  REFERER_HEADER_REQUIRED_FAIL,
} = require('../configs/ru');

const isUrlJoi = joiCustom(isURL, URL_FAIL);
const isNameJoi = joiCustom(isName, NAME_FAIL);
const isPasswordJoi = joiCustom(isPassword, PASSWORD_FAIL);
const isKeywordJoi = joiCustom(isKeyword, KEYWORD_FAIL);

const _id = Joi.string().required().length(24).hex();
const str = Joi.string().required();

const id = {
  params: Joi.object().keys(
    enableCustomErrors({
      id: _id,
    }),
  ),
};

const article = {
  body: Joi.object().keys(
    enableCustomErrors({
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

const authBody = enableCustomErrors({
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
      enableCustomErrors({
        name: str.min(2).max(30).custom(isNameJoi),
      }),
    ),
};

const logout = {
  headers: Joi.object()
    .keys({
      referer: str.messages({
        'any.required': REFERER_HEADER_REQUIRED_FAIL,
      }),
    })
    .unknown(true),
};

const json = {
  headers: Joi.object()
    .keys({
      'content-type': Joi.string().valid('application/json').messages({
        'any.only': JSON_CONTENT_FAIL,
      }),
    })
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

const bcrypt = require('bcryptjs');
const { jwtCookieOptions, getToken } = require('../config/jwt');
const { SALT_LENGTH } = require('../config/settings');

const User = require('../models/user');
const {
  Err,
  NO_USER,
  USER_EXISTS,
  FORBIDDEN,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/errors');
const { cleanCreated } = require('../utils/utils');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Err(NO_USER))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Err(USER_EXISTS);
      }
    })
    .then(() =>
      bcrypt
        .hash(password, SALT_LENGTH)
        .then((hash) => User.create({ email, name, password: hash }))
        .then((user) => {
          res.status(201).send(cleanCreated(user, '__v', 'password'));
        }),
    )
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new Err(WRONG_EMAIL_OR_PASSWORD))
    .then((user) => {
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Err(WRONG_EMAIL_OR_PASSWORD);
        }

        const token = getToken({ _id: user._id });
        res
          .cookie('jwt', token, jwtCookieOptions)
          .send({ message: 'Вы успешно авторизовались' });
      });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  const { _id } = req.body;
  if (_id !== req.user._id) {
    throw new Err(FORBIDDEN);
  }
  User.findById(_id)
    .orFail(new Err(NO_USER))
    .then(() => {
      res.clearCookie('jwt').send({ message: 'Вы успешно вышли' });
    })
    .catch(next);
};

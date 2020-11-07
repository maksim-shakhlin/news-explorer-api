const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  SALT_LENGTH,
  JWT_OPTIONS,
  JWT_COOKIE_OPTIONS,
  WHITELIST,
} = require('../configs/constants');

const { JWT_SECRET } = require('../configs/config');

const {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
} = require('../errors/errors');

const User = require('../models/user');

const { cleanCreated } = require('../utils/cleaners');
const {
  NO_USER,
  USER_EXISTS,
  WRONG_EMAIL_OR_PASSWORD,
  LOGIN_OK,
  LOGOUT_OK,
} = require('../configs/ru');
const { urlWithoutPath } = require('../utils/utils');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .select('-_id')
    .orFail(new NotFoundError(NO_USER))
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
        throw new ConflictError(USER_EXISTS);
      }
    })
    .then(() =>
      bcrypt
        .hash(password, SALT_LENGTH)
        .then((hash) => User.create({ email, name, password: hash }))
        .then((user) => {
          res.status(201).send(cleanCreated(user, '__v', 'password', '_id'));
        }),
    )
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError(WRONG_EMAIL_OR_PASSWORD))
    .then((user) => {
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(WRONG_EMAIL_OR_PASSWORD);
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, JWT_OPTIONS);
        res
          .cookie('jwt', token, JWT_COOKIE_OPTIONS)
          .send({ message: LOGIN_OK });
      });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  if (WHITELIST.indexOf(urlWithoutPath(req.headers.referer)) === -1) {
    next(new ForbiddenError());
    return;
  }
  User.findById(req.user._id)
    .orFail(new NotFoundError(NO_USER))
    .then(() => {
      res.clearCookie('jwt').send({ message: LOGOUT_OK });
    })
    .catch(next);
};

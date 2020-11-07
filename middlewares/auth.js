const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');

const { UnauthorizedError } = require('../errors/errors');
const User = require('../models/user');
const { UNAUTHORIZED } = require('../configs/ru');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(UNAUTHORIZED));
    return;
  }

  function onBadToken() {
    res.clearCookie('jwt');
    next(new UnauthorizedError(UNAUTHORIZED));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    onBadToken();
    return;
  }

  User.findById(payload)
    .orFail(onBadToken)
    .then(() => {
      req.user = payload;
      next();
    })
    .catch(next);
};

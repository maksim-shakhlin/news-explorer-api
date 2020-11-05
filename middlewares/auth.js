const { verify } = require('../config/jwt');
const { UnauthorizedError } = require('../errors/errors');
const User = require('../models/user');
const { UNAUTHORIZED } = require('../utils/error-messages');

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
    payload = verify(token);
  } catch (err) {
    onBadToken();
    return;
  }

  User.findById(payload)
    .then((user) => {
      if (!user) {
        onBadToken();
      } else {
        req.user = payload;
        next();
      }
    })
    .catch(next);
};

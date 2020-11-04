const { verify } = require('../config/jwt');
const User = require('../models/user');
const { Err, UNAUTHORIZED } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new Err(UNAUTHORIZED));
    return;
  }

  function onBadToken() {
    res.clearCookie('jwt');
    next(new Err(UNAUTHORIZED));
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

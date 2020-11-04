require('dotenv').config();

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSecret = (NODE_ENV === 'production' && JWT_SECRET) || 'dev-jwt-secret';

const jwtOptions = {
  expiresIn: '7d',
};

module.exports.getToken = (payload) => {
  return jwt.sign(payload, jwtSecret, jwtOptions);
};

module.exports.verify = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports.jwtCookieOptions = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  sameSite: true,
};

const rateLimit = require('express-rate-limit');

const options = {
  windowMs: 5 * 60 * 1000,
  max: 50,
};

module.exports.limiter = rateLimit(options);

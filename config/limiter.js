const rateLimit = require('express-rate-limit');

const limiterOptions = {
  windowMs: 5 * 60 * 1000,
  max: 50,
};

module.exports = rateLimit(limiterOptions);

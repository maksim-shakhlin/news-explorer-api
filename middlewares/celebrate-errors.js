const { isCelebrateError } = require('celebrate');
const { BadRequestError } = require('../errors/errors');

module.exports = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const messages = Array.from(err.details.values()).map(
    (error) => error.message,
  );

  if (messages) {
    return next(new BadRequestError(messages.join('. ')));
  }

  return next(err);
};

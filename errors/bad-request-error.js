const { STATUS_400_DEFAULT_MESSAGE } = require('../configs/ru');

class BadRequestError extends Error {
  constructor(message = STATUS_400_DEFAULT_MESSAGE) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

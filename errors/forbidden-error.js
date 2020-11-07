const { STATUS_403_DEFAULT_MESSAGE } = require('../configs/ru');

class ForbiddenError extends Error {
  constructor(message = STATUS_403_DEFAULT_MESSAGE) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

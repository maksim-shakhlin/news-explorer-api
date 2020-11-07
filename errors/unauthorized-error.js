const { STATUS_401_DEFAULT_MESSAGE } = require('../configs/ru');

class UnauthorizedError extends Error {
  constructor(message = STATUS_401_DEFAULT_MESSAGE) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;

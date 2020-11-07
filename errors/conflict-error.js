const { STATUS_409_DEFAULT_MESSAGE } = require('../configs/ru');

class ConflictError extends Error {
  constructor(message = STATUS_409_DEFAULT_MESSAGE) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;

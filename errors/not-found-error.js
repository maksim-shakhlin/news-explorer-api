const { STATUS_404_DEFAULT_MESSAGE } = require('../configs/ru');

class NotFoundError extends Error {
  constructor(message = STATUS_404_DEFAULT_MESSAGE) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

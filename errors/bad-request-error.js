class BadRequestError extends Error {
  constructor(message = 'Такой объект уже существует') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

class ConflictError extends Error {
  constructor(message = 'Такой объект уже существует') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;

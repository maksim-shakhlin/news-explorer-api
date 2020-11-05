class ForbiddenError extends Error {
  constructor(message = 'У вас нет прав на совершение этой операции') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

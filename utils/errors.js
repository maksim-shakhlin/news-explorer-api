class Err extends Error {
  constructor({ message = 'Ошибка сервера', statusCode = 500 }) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports.Err = Err;

module.exports.WRONG_EMAIL_OR_PASSWORD = {
  message: 'Неправильный логин или пароль',
  statusCode: 401,
};

module.exports.UNAUTHORIZED = {
  message: 'Необходима авторизация',
  statusCode: 401,
};

module.exports.FORBIDDEN = {
  message: 'У вас нет прав на совершение этой операции',
  statusCode: 403,
};

module.exports.NO_USER = {
  message: 'Пользователь с таким id не найден',
  statusCode: 404,
};

module.exports.NO_ARTICLE = {
  message: 'Статья с таким id не найдена',
  statusCode: 404,
};

module.exports.NO_ENDPOINT = {
  message: 'Эндпоинт не найден',
  statusCode: 404,
};

module.exports.USER_EXISTS = {
  message: 'Пользователь с таким email уже существует',
  statusCode: 409,
};

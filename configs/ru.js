// Response messages

module.exports.WRONG_EMAIL_OR_PASSWORD = 'Неправильный логин или пароль';
module.exports.NO_USER = 'Пользователь с таким id не найден';
module.exports.NO_ARTICLE = 'Статья с таким id не найдена';
module.exports.NO_ENDPOINT = 'Эндпоинт не найден';
module.exports.USER_EXISTS = 'Пользователь с таким email уже существует';
module.exports.ARTICLE_DELETED_OK = 'Статья успешно удалена';
module.exports.LOGIN_OK = 'Вы успешно авторизовались';
module.exports.LOGOUT_OK = 'Вы успешно вышли';

// Validation messages

module.exports.REQUIRED_FAIL = 'Это поле обязательное';
module.exports.URL_FAIL = 'Невалидная ссылка';
module.exports.KEYWORD_FAIL = 'Допускаются только буквы и дефисы';
module.exports.DATE_ISO8601_FAIL =
  'Должна быть строка с датой в формате ISO 8601';
module.exports.EMAIL_FAIL = 'Невалидный email';
module.exports.NAME_FAIL = 'Допускаются только буквы, пробелы и дефисы';
module.exports.EMPTY = 'Поле должно быть заполнено';

module.exports.DATE_FAIL = 'Это должна быть дата';
module.exports.HEX_FAIL = 'Это должна быть hex-строка';
module.exports.PASSWORD_FAIL =
  'Можно латинские буквы, цифры и любые спецсимволы';
module.exports.JSON_CONTENT_FAIL = 'Принимается только application/json';
module.exports.REFERER_HEADER_REQUIRED_FAIL =
  'HTTP-заголовок referer обязателен';

// Patterns

module.exports.TOO_SHORT_PATTERN = 'Минимум %n %n-symbol';
module.exports.TOO_LONG_PATTERN = 'Максимум %n %n-symbol';
module.exports.LENGTH_MISMATCH_PATTERN =
  'Длина строки должна быть %n %n-symbol';
module.exports.MONGOOSE_CAST_ERROR_PATTERN = '"%path %model невалидно';

// Default response messages

module.exports.STATUS_409_DEFAULT_MESSAGE = 'Такой объект уже существует';
module.exports.STATUS_400_DEFAULT_MESSAGE = 'Некорректный запрос';
module.exports.STATUS_403_DEFAULT_MESSAGE =
  'У вас нет прав на совершение этой операции';
module.exports.STATUS_404_DEFAULT_MESSAGE = 'Не найдено';
module.exports.STATUS_401_DEFAULT_MESSAGE = 'Необходима авторизация';
module.exports.STATUS_500_DEFAULT_MESSAGE = 'Ошибка на сервере';

// Dictionaries

module.exports.DICTIONARY = {
  symbol: ['символ', 'символа', 'cимволов'],
};

module.exports.MODELS_DICTIONARY = {
  article: 'статьи',
  user: 'пользователя',
};

// Regexps

module.exports.NAME_REGEXP = /^[a-zа-яё\s-]{1,}$/i;
module.exports.KEYWORD_REGEXP = /^[a-zа-яё-]{1,}$/i;

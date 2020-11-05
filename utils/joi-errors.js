function getMessage(err) {
  switch (err.code) {
    case 'any.empty':
    case 'string.empty':
      return 'Поле должно быть заполнено';
    case 'any.required':
      return 'Это поле обязательное';
    case 'any.custom':
    case 'custom':
      return err.messages.source;
    case 'string.min':
      return `Минимальная длина строки — ${err.local.limit}`;
    case 'string.max':
      return `Максимальная длина строки — ${err.local.limit}`;
    case 'string.length':
      return `Длина строки должна быть ${err.local.limit}`;
    case 'date.base':
    case 'date.format':
      return 'Это должна быть дата';
    case 'date.isoDate':
      return 'Это должна быть дата в формате ISO 8601';
    case 'string.email':
      return 'Это должен быть email';
    case 'string.hex':
      return 'Это должна быть hex-строка';
    default:
      return '';
  }
}

module.exports = (errors) => {
  return errors.map((error) => {
    const err = error;
    const message = getMessage(error);
    err.message = message ? `${err.local.label}: ${message}` : error.message;
    return err;
  });
};

const { BadRequestError } = require('../errors/errors');

const modelDict = {
  article: 'статьи',
  user: 'пользователя',
};

module.exports = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError': {
      const message = Object.values(err.errors)
        .map((error) => `"${error.path}": ${error.message}`)
        .join('. ');
      next(new BadRequestError(message));
      break;
    }

    case 'CastError': {
      const path = err.path === '_id' ? 'id' : err.path;
      const parts = err.message.split('"');
      const model = modelDict[parts[parts.length - 2]] || '';
      next(
        new BadRequestError(`"${path}" ${model}${model ? ' ' : ''}невалидно`),
      );
      break;
    }

    default:
      next(err);
  }
};

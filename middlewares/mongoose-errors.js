const {
  MODELS_DICTIONARY,
  MONGOOSE_CAST_ERROR_PATTERN,
} = require('../configs/ru');
const { BadRequestError } = require('../errors/errors');
const { formMessage } = require('../utils/message');

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
      const model = MODELS_DICTIONARY[parts[parts.length - 2]] || '';
      next(
        new BadRequestError(
          formMessage(MONGOOSE_CAST_ERROR_PATTERN, { path, model }),
        ),
      );
      break;
    }

    default:
      next(err);
  }
};

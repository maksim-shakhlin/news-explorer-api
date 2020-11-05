const notFound = require('express').Router();
const { NotFoundError } = require('../errors/errors');
const { NO_ENDPOINT } = require('../utils/error-messages');

notFound.all('/', () => {
  throw new NotFoundError(NO_ENDPOINT);
});

module.exports = notFound;

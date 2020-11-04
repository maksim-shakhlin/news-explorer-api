const notFound = require('express').Router();
const { Err, NO_ENDPOINT } = require('../utils/errors');

notFound.all('/', () => {
  throw new Err(NO_ENDPOINT);
});

module.exports = notFound;

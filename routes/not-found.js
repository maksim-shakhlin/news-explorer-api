const router = require('express').Router();
const { NotFoundError } = require('../errors/errors');
const { NO_ENDPOINT } = require('../configs/ru');

router.all('/', (req, res, next) => {
  return next(new NotFoundError(NO_ENDPOINT));
});

module.exports = router;

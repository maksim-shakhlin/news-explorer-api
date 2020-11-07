const { STATUS_500_DEFAULT_MESSAGE } = require('../configs/ru');

module.exports = (err, req, res, next) => {
  if (!res.headersSent) {
    const code = err.statusCode || 500;
    const message = (code === 500 && STATUS_500_DEFAULT_MESSAGE) || err.message;
    res.status(code).send({ message });
  }
  next();
};

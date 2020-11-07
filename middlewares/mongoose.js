const mongoose = require('mongoose');

const { DB_CONN } = require('../configs/config');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.mongoose = () => {
  mongoose.connect(DB_CONN, options);
};

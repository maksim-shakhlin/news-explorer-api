require('dotenv').config();

const mongoose = require('mongoose');

const { NODE_ENV, DB_CONN } = process.env;

const mongoConnection =
  (NODE_ENV === 'production' && DB_CONN) || 'mongodb://localhost:27017/newsdb';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = () => mongoose.connect(mongoConnection, mongooseOptions);

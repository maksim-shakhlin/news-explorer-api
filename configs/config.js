require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET = 'dev-jwt-secret',
  PORT = 3000,
  DB_CONN = 'mongodb://localhost:27017/newsdb',
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DB_CONN,
};

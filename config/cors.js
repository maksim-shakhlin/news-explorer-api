require('dotenv').config();
const cors = require('cors');

const { NODE_ENV } = process.env;

const whitelist = [
  'https://news.deque.ru',
  'http://news.deque.ru',
  'https://www.news.deque.ru',
  'http://www.news.deque.ru',
];

if (NODE_ENV !== 'production') {
  whitelist.push('http://localhost:3001');
}

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};

module.exports = cors(corsOptions);

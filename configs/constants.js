const { NODE_ENV } = require('./config');

module.exports.SALT_ROUNDS = 10;

module.exports.JWT_OPTIONS = {
  expiresIn: '7d',
};

module.exports.JWT_COOKIE_OPTIONS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  sameSite: true,
};

const whitelist = [
  'https://news.deque.ru',
  'http://news.deque.ru',
  'https://www.news.deque.ru',
  'http://www.news.deque.ru',
];

if (NODE_ENV !== 'production') {
  whitelist.push('http://localhost:3001');
}

module.exports.WHITELIST = whitelist;

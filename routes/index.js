const index = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const notFound = require('./not-found');
const { login, createUser, logout } = require('../controllers/users');

const {
  validateLogout,
  validateSignin,
  validateSignup,
} = require('../middlewares/request-validators');
const auth = require('../middlewares/auth');

index.post('/signin', validateSignin, login);
index.post('/signup', validateSignup, createUser);

index.use('/users', users); // no auth here to pass ...
index.use('/articles', articles); // ... non existing endpoints to notFound
index.post('/logout', auth, validateLogout, logout);

index.use('*', notFound);

module.exports = index;

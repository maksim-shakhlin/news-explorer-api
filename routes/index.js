const index = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const notFound = require('./notFound');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  logoutValidator,
  signinValidator,
  signupValidator,
} = require('../utils/request-validators');

index.post('/signin', signinValidator, login);
index.post('/signup', signupValidator, createUser);

index.use('/users', users); // no auth here to pass ...
index.use('/articles', articles); // ... nonexisting endpoints to notFound
index.post('/logout', auth, logoutValidator, logout);

index.use('*', notFound);

module.exports = index;

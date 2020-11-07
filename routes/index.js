const router = require('express').Router();
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

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use('/users', users); // no auth here to pass ...
router.use('/articles', articles); // ... non existing endpoints to notFound
router.post('/logout', auth, validateLogout, logout);

router.use('*', notFound);

module.exports = router;

const users = require('express').Router();

const auth = require('../middlewares/auth');
const { getUser } = require('../controllers/users');

users.get('/me', auth, getUser);

module.exports = users;

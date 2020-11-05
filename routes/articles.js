const articles = require('express').Router();
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');
const {
  validateID,
  validateArticle,
} = require('../middlewares/request-validators');

articles.get('/', auth, getArticles);
articles.post('/', auth, validateArticle, saveArticle);
articles.delete('/:id', auth, validateID, deleteArticle);

module.exports = articles;

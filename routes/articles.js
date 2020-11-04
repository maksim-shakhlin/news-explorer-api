const articles = require('express').Router();
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');
const {
  idValidator,
  articleValidator,
} = require('../utils/request-validators');

articles.get('/', auth, getArticles);
articles.post('/', auth, articleValidator, saveArticle);
articles.delete('/:id', auth, idValidator, deleteArticle);

module.exports = articles;

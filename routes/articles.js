const router = require('express').Router();
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

router.get('/', auth, getArticles);
router.post('/', auth, validateArticle, saveArticle);
router.delete('/:id', auth, validateID, deleteArticle);

module.exports = router;

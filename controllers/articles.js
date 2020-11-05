const { ForbiddenError, NotFoundError } = require('../errors/errors');
const Article = require('../models/article');

const { cleanCreated } = require('../utils/cleaners');
const { NO_ARTICLE } = require('../utils/error-messages');
const { ARTICLE_DELETED } = require('../utils/response-bodies');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send(cleanCreated(article, '__v', 'owner'));
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('owner')
    .orFail(new NotFoundError(NO_ARTICLE))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Article.findByIdAndDelete(req.params.id);
    })
    .then(() => res.send(ARTICLE_DELETED))
    .catch(next);
};

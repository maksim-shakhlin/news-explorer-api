const Article = require('../models/article');

const { cleanCreated } = require('../utils/utils');
const { Err, NO_ARTICLE, FORBIDDEN } = require('../utils/errors');

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
    .orFail(new Err(NO_ARTICLE))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new Err(FORBIDDEN);
      }
      return Article.findByIdAndDelete(req.params.id);
    })
    .then(() => res.send({ message: 'Сатья успешно удалена' }))
    .catch(next);
};

const {fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId, insertComment} = require('../models/news_site.js')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics: topics})
    })
    .catch((err) => {
        next(err);
    })
};

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => {
        res.status(200).send({articles: articles})
    })
    .catch((err) => {
        next(err);
    })
};

exports.getArticleById = (req, res, next) => {
    fetchArticleById(req.params.articleId)
    .then((article) => {
        res.status(200).send({article: article})
    })
    .catch((err) => {
        next(err);
    })
};

exports.getCommentsByArticleId = (req, res, next) => {
    fetchCommentsByArticleId(req.params.articleId)
    .then((comments) => {
        res.status(200).send({comments: comments})
    })
    .catch((err) => {
        next(err);
    })
};

exports.postComment = (req, res, next) => {
    insertComment(req.body, req.params.article_id).then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
        next(err);
    })
  };
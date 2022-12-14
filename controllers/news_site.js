const {fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId, insertComment, changeArticleById, fetchUsers, removeComment, findAPI} = require('../models/news_site.js')
const endPoints = require('../endpoints.json')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics: topics})
    })
    .catch((err) => {
        console.log(err)
        next(err);
    })
};

exports.getArticles = (req, res, next) => {
    const {sort_by,order,topic} = req.query
    fetchArticles(sort_by,order,topic)
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
    insertComment(req.body, req.params.articleId).then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
        next(err);
    })
  };

exports.patchArticleById = (req, res, next) => {
    changeArticleById(req.params.articleId, req.body).then( (article) => {
        res.status(202).send({article: article})
    })
    .catch((err) => {
        next(err);
    })
}

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
        res.status(200).send({users: users})
    })
    .catch((err) => {
        next(err);
    })
};

exports.deleteComment = (req,res,next) => {
    removeComment(req.params.comment_id).then((comment) => {
        res.status(204).send();
      }).catch((err) => {
        next(err)
      })
}

exports.getAPI = (req,res,next) => {
    res.send({endPoints: endPoints})
    res.status(200)
    

    }

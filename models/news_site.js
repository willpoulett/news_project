const db = require('../db/connection.js');

exports.fetchTopics = () => {
    return db.query(`
    SELECT * FROM topics;`
    )
    .then((res) => {
      return res.rows;
      });
}

exports.fetchArticles = () => {
  return db.query(`
  SELECT articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  COUNT(comments.article_id)::INT AS comment_count
  FROM articles
  JOIN comments
  ON articles.article_id = comments.article_id
  GROUP By articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes
  ORDER BY articles.created_at DESC
  ;
`
  )
  .then((res) => {
    return res.rows;
    });
}

exports.fetchArticleById = (article_id) => {
  return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then((result) => {
        if (result.rows.length === 0){
          return Promise.reject({status:404,msg:'That article does not exist'})
        }
          return result.rows[0]})
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
      .query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at ASC;`, [article_id])
      .then((result) => {
        if (result.rows.length === 0){
          return Promise.reject({status:404,msg:'That article does not exist'})
        }
          return result.rows})
};
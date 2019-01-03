const db = require("../db");
const { fetchAllAuthors, fetchAuthorById } = require("../models/authors");

const sendAllAuthors = (req, res, next) => {
  fetchAllAuthors((err, authors) => {
    if (err) next(err);
    else res.send(authors);
  });
};

const sendAuthorJokes = (req, res, next) => {
  const { authorid } = req.params;
  db.many(
    "SELECT * FROM Authors JOIN Jokes ON Authors.author_id = Jokes.author_id WHERE Jokes.author_id = $<authorid>",
    { authorid }
  )
    .then(jokes => res.send(jokes))
    .catch(err => next(err));
};

const sendAuthorById = (req, res, next) => {
  const { authorid } = req.params;
  fetchAuthorById(authorid, (err, author) => {
    if (err) next(err);
    else res.send(author);
  });
};

module.exports = {
  sendAllAuthors,
  sendAuthorJokes,
  sendAuthorById
};

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

const sendNewAuthor = (req, res, next) => {
  const { author } = req.body;
  fetchAllAuthors((err, authors) => {
    if (err) next(err);
    else {
      console.log(authors);
      if (!authors.find(author => author.author_name === author)) {
        db.one(
          "INSERT INTO Authors (author_name) VALUES ($<author>) RETURNING *",
          {
            author
          }
        )
          .then(author => res.status(201).send({ author }))
          .catch(next);
      } else next("author already exists");
    }
  });
};
module.exports = {
  sendAllAuthors,
  sendAuthorJokes,
  sendAuthorById,
  sendNewAuthor
};

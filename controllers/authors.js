const db = require("../db");
const {
  fetchAllAuthors,
  fetchAuthorById,
  fetchAuthorJokes,
  saveNewAuthor
} = require("../models/authors");

const sendAllAuthors = (req, res, next) => {
  fetchAllAuthors((err, authors) => {
    if (err) next(err);
    else res.send({ authors });
  });
};

const sendAuthorJokes = (req, res, next) => {
  const { authorid } = req.params;
  fetchAuthorJokes(authorid, (err, jokes) => {
    if (err) next(err);
    else res.send({ jokes });
  });
};

const sendAuthorById = (req, res, next) => {
  const { authorid } = req.params;
  fetchAuthorById(authorid, (err, author) => {
    if (err) next(err);
    else res.send({ author });
  });
};

const sendNewAuthor = (req, res, next) => {
  const { author } = req.body;
  saveNewAuthor(author, (err, author) => {
    if (err) next(err);
    else res.status(201).send({ author });
  });
};

module.exports = {
  sendAllAuthors,
  sendAuthorJokes,
  sendAuthorById,
  sendNewAuthor
};

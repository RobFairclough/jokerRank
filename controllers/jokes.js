const db = require("../db");
const { fetchAllJokes, saveNewJoke } = require("../models/jokes");

const sendAllJokes = (req, res, next) => {
  fetchAllJokes((err, jokes) => {
    if (err) next(err);
    else res.send(jokes);
  });
};

const sendRandomJoke = (req, res, next) => {
  fetchAllJokes((err, jokes) => {
    if (err) next(err);
    else {
      // do something
    }
  });
};

const sendNewJoke = (req, res, next) => {
  const { joke } = req.body.params;
};

module.exports = {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke
};

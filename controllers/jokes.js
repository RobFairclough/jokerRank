const db = require("../db");
const {
  fetchAllJokes,
  saveNewJoke,
  fetchRandomJoke
} = require("../models/jokes");

const sendAllJokes = (req, res, next) => {
  fetchAllJokes((err, jokes) => {
    if (err) next(err);
    else res.send(jokes);
  });
};

const sendRandomJoke = (req, res, next) => {
  fetchRandomJoke((err, joke) => {
    if (err) next(err);
    else {
      res.send(joke);
      // do something
    }
  });
};

const sendNewJoke = (req, res, next) => {
  const { joke } = req.body.params;
};

const sendVote = (req, res, next) => {
  const { vote } = req.body.params;
};

module.exports = {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke
};

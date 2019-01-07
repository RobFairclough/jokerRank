const db = require("../db");
const {
  fetchAllJokes,
  saveNewJoke,
  fetchRandomJoke,
  applyVote
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
    }
  });
};

const sendNewJoke = (req, res, next) => {
  const { joke, author } = req.body;
  saveNewJoke(joke, author, (err, done) => {
    if (err) next(err);
    else res.send(done);
  });
};

const sendVote = (req, res, next) => {
  const { jokeid, vote } = req.body;
  applyVote(jokeid, vote, (err, done) => {
    if (err) next(err);
    else res.send(done);
  });
};

module.exports = {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke,
  sendVote
};

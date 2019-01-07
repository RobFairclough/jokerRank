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
    else res.send({ jokes });
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
  saveNewJoke(joke, author, (err, joke) => {
    if (err) next(err);
    else res.status(201).send({ joke });
  });
};

const sendVote = (req, res, next) => {
  const { jokeid, vote } = req.body;
  applyVote(jokeid, vote, (err, joke) => {
    if (err) next(err);
    else res.send({ joke });
  });
};

module.exports = {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke,
  sendVote
};

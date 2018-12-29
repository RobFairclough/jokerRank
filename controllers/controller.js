const {
  generateNew,
  applyVote,
  getAll,
  getRandom
} = require("../models/model");

const sendNew = (req, res, next) => {
  const joke = req.body.joke;
  const author = req.body.author;
  generateNew(joke, author, (err, done) => {
    if (err) next(err);
    // success, maybe display that joke
    res.send(done);
  });
};

const sendVote = (req, res, next) => {
  const vote = req.body.vote;
  const jokeid = req.body.jokeid; // find this
  applyVote(vote, jokeid, (err, done) => {
    if (err) next(err);
    else res.send(done);
  });
};

const sendAll = (req, res, next) => {
  getAll((err, data) => {
    if (err) next(err);
    else res.send(data);
  });
};

const sendRandom = (req, res, next) => {
  getRandom((err, data) => {
    if (err) next(err);
    else res.send(data);
  });
};

module.exports = { sendNew, sendVote, sendAll, sendRandom };

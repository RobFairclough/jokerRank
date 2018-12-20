const {
  generateNew,
  applyVote,
  getAll,
  getRandom
} = require("../models/model");

const sendNew = (req, res, next) => {
  const quote = req.body.quote;
  const author = req.body.author;
  generateNew(quote, author, (err, done) => {
    if (err) next(err);
    // success, maybe display that quote
    res.send(done);
  });
};

const sendVote = (req, res, next) => {
  const vote = req.body.vote;
  const quoteid = req.body.quoteid; // find this
  applyVote(vote, quoteid, (err, done) => {
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

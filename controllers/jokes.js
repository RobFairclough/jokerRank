const db = require('../db');
const {
  fetchAllJokes,
  saveNewJoke,
  fetchRandomJoke,
  applyVote
} = require('../models/jokes');
const seed = require('../seedtext');

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

// const seedMeSeymour = (req, res, next) => {
//   db.many(seed)
//     .then(seed => res.send(seed))
//     .catch(next);
// };

module.exports = {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke,
  sendVote
  // seedMeSeymour
};

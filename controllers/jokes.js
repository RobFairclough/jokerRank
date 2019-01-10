const db = require('../db');
const {
  fetchAllJokes,
  saveNewJoke,
  fetchRandomJoke,
  applyVote,
  applyDeletion
} = require('../models/jokes');
const { tweet } = require('../models/report');
const seed = require('../seedtext');

// GET
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

// POST
const sendNewJoke = (req, res, next) => {
  const { joke, author } = req.body;
  saveNewJoke(joke, author, (err, newJoke) => {
    console.log(newJoke);
    if (err) next(err);
    else {
      if (newJoke.joke.length < 240) tweet(newJoke.joke);
      tweet(newJoke.joke);
      res.render('pages/submitted.ejs', { newJoke });
    }
  });
};

const sendVote = (req, res, next) => {
  const { jokeid, vote } = req.body;
  applyVote(jokeid, vote, (err, done) => {
    if (err) next(err);
    else res.send(done);
  });
};

// DELETE
const requestDeletion = (req, res, next) => {
  const { jokeid } = req.params;
  const { pass } = req.body;
  applyDeletion(jokeid, pass, (err, deleted) => {
    if (err) next(err);
    // invalid password screen
    else res.send({ msg: 'successfully deleted this joke', joke: deleted });
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
  sendVote,
  requestDeletion
  // seedMeSeymour
};

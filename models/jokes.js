const db = require("../db");

const fetchAllJokes = cb => {
  db.many("SELECT * FROM Jokes")
    .then(jokes => cb(null, jokes))
    .catch(err => cb(err));
};

const saveNewJoke = (joke, cb) => {};

module.exports = { fetchAllJokes };

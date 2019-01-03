const db = require("../db");

const fetchAllJokes = cb => {
  db.many("SELECT * FROM Jokes")
    .then(jokes => cb(null, jokes))
    .catch(err => cb(err));
};

const saveNewJoke = (joke, cb) => {};

const fetchRandomJoke = cb => {
  fetchAllJokes((err, jokes) => {
    const rand = Math.floor(Math.random() * 5);
    if (jokes[rand]) cb(null, jokes[rand]);
    else cb("err");
  });
};

module.exports = { fetchAllJokes, fetchRandomJoke, saveNewJoke };

const db = require("../db");
const { fetchAuthorById } = require("./authors");

const fetchAllJokes = cb => {
  db.many("SELECT * FROM Jokes")
    .then(jokes => cb(null, jokes))
    .catch(err => cb(err));
};

const saveNewJoke = (joke, cb) => {};

const fetchRandomJoke = cb => {
  fetchAllJokes((err, jokes) => {
    if (err) cb(err);
    const rand = Math.floor(Math.random() * 5);
    const joke = jokes[rand];
    if (!joke) cb("err finding joke");
    else {
      fetchAuthorById(joke.author_id, (err, author) => {
        if (err) cb(err);
        else {
          console.log(author);
          const jokeobj = {
            joke: joke.joke,
            author: author.author_name,
            score: joke.score
          };
          cb(null, jokeobj);
        }
      });
    }
  });
};

module.exports = { fetchAllJokes, fetchRandomJoke, saveNewJoke };

const db = require("../db");
const {
  fetchAuthorById,
  fetchAllAuthors,
  saveNewAuthor
} = require("./authors");

const fetchAllJokes = cb => {
  db.many("SELECT * FROM Jokes")
    .then(jokes => cb(null, jokes))
    .catch(err => cb(err));
};

const saveNewJoke = (joke, author, cb) => {
  const jokeObj = {};
  jokeObj.joke = joke;
  // will create new author if required, or return id of the author if already exists
  saveNewAuthor(author, (err, auth) => {
    jokeObj.author_id = auth.author_id;
    const { joke, author_id } = jokeObj;
    db.one(
      "INSERT INTO Jokes (joke, author_id) VALUES ($<joke>, $<author_id>) RETURNING *",
      { joke, author_id }
    )
      .then(joke => {
        console.log(joke);
        cb(null, joke);
      })
      .catch(err => cb(err));
  });
};

const fetchRandomJoke = cb => {
  fetchAllJokes((err, jokes) => {
    if (err) cb(err);
    const rand = Math.floor(Math.random() * jokes.length);
    const joke = jokes[rand];
    if (!joke) cb("err finding joke");
    else {
      fetchAuthorById(joke.author_id, (err, author) => {
        if (err) cb(err);
        else {
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

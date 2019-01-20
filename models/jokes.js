const db = require('../db');
const Filter = require('bad-words');
const profanityFilter = new Filter();
const { tweet } = require('./report');
const { fetchAuthorById, saveNewAuthor } = require('./authors');

const fetchAllJokes = cb => {
  db.many('SELECT * FROM Jokes ORDER BY joke_id')
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
      'INSERT INTO Jokes (joke, author_id) VALUES ($<joke>, $<author_id>) RETURNING *',
      { joke, author_id }
    )
      .then(joke => {
        const newObj = {
          joke: joke.joke,
          author: auth.author_name,
          jokeid: joke.joke_id,
          authorid: auth.author_id
        };
        let tweetJoke = joke.joke;
        if (joke.joke.length < 275 && !profanityFilter.isProfane(joke.joke)) {
          if (tweetJoke.length + newObj.author.length <= 275)
            tweetJoke += ` - ${joke.author}`;
          tweet(tweetJoke);
        }
        cb(null, newObj);
      })
      .catch(err => cb(err));
  });
};

const fetchRandomJoke = cb => {
  fetchAllJokes((err, jokes) => {
    if (err) cb(err);
    const rand = Math.floor(Math.random() * jokes.length);
    const joke = jokes[rand];
    if (!joke) cb('err finding joke');
    else {
      fetchAuthorById(joke.author_id, (err, author) => {
        if (err) cb(err);
        else {
          const jokeobj = {
            joke: joke.joke,
            author: author.author_name,
            score: joke.score,
            jokeid: joke.joke_id
          };
          cb(null, jokeobj);
        }
      });
    }
  });
};
const fetchRandomJokeClean = cb => {
  fetchAllJokes((err, jokes) => {
    if (err) cb(err);
    const cleanJokes = jokes.filter(
      joke => profanityFilter.isProfane(joke.joke) === false
    );
    const rand = Math.floor(Math.random() * cleanJokes.length);
    const joke = cleanJokes[rand];
    if (!joke) cb('err finding joke');
    else {
      fetchAuthorById(joke.author_id, (err, author) => {
        if (err) cb(err);
        else {
          const jokeobj = {
            joke: joke.joke,
            author: author.author_name,
            score: joke.score,
            jokeid: joke.joke_id
          };
          cb(null, jokeobj);
        }
      });
    }
  });
};

const applyVote = (id, vote, cb) => {
  const voteValue = vote === 'up' ? 1 : -1;
  const jokeid = id;
  db.one(
    'UPDATE Jokes set score = score + $<voteValue> WHERE joke_id = $<jokeid> RETURNING *',
    { voteValue, jokeid }
  )
    .then(vote => cb(null, vote))
    .catch(err => cb(err));
};

const applyDeletion = (id, pass, cb) => {
  const { delpass } = process.env.delpass || require('../config');
  if (pass === delpass) {
    // success
    db.one('DELETE FROM jokes WHERE joke_id = $<id> RETURNING *', { id })
      .then(deleted => cb(null, deleted))
      .catch(cb);
  } else {
    cb({ msg: 'Incorrect password' });
  }
};

module.exports = {
  fetchAllJokes,
  fetchRandomJoke,
  fetchRandomJokeClean,
  saveNewJoke,
  applyVote,
  applyDeletion
};

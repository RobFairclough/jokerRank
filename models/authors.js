const db = require('../db');

const fetchAllAuthors = cb => {
  db.many('SELECT * FROM Authors')
    .then(authors => cb(null, authors))
    .catch(err => cb(err));
};

const fetchAuthorJokes = (id, cb) => {
  db.many(
    'SELECT * FROM Authors JOIN Jokes ON Authors.author_id = Jokes.author_id WHERE Jokes.author_id = $<id>',
    { id }
  )
    .then(jokes => cb(null, jokes))
    .catch(err => cb(err));
};

const fetchAuthorById = (id, cb) => {
  db.one('SELECT * FROM Authors WHERE author_id = $<id>', {
    id
  })
    .then(author => cb(null, author))
    .catch(err => cb(err));
};

const saveNewAuthor = (author, cb) => {
  if (!author) author = 'Anonymous';
  fetchAllAuthors((err, authors) => {
    if (err) cb(err);
    else {
      const exists = authors.find(existing => existing.author_name === author);
      if (!exists) {
        db.one(
          'INSERT INTO Authors (author_name) VALUES ($<author>) RETURNING *',
          {
            author
          }
        )
          .then(author => cb(null, author))
          .catch(err => cb(err));
      } else cb(null, exists);
    }
  });
};

module.exports = {
  fetchAllAuthors,
  fetchAuthorById,
  fetchAuthorJokes,
  saveNewAuthor
};

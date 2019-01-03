const db = require("../db");

const fetchAllAuthors = cb => {
  db.many("SELECT * FROM Authors")
    .then(authors => cb(null, authors))
    .catch(err => cb(err));
};

const fetchAuthorById = (id, cb) => {
  db.one("SELECT * FROM Authors WHERE author_id = $<id>", {
    id
  })
    .then(author => cb(null, author))
    .catch(err => cb(err));
};

module.exports = { fetchAllAuthors, fetchAuthorById };

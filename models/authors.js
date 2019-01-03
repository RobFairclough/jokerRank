const db = require("../db");

const fetchAllAuthors = cb => {
  db.many("SELECT * FROM Authors")
    .then(authors => cb(null, authors))
    .catch(err => cb(err));
};

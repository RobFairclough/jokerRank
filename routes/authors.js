const authorsRouter = require("express").Router();

const {
  sendAllAuthors,
  sendAuthorJokes,
  sendAuthorById,
  sendNewAuthor
} = require("../controllers/authors");

// display all authors
authorsRouter.get("/all", sendAllAuthors);
// display all of an author's jokes
authorsRouter.get("/:authorid/jokes", sendAuthorJokes);
// send an author by id
authorsRouter.get("/:authorid", sendAuthorById);

// add a new author
authorsRouter.post("/new", sendNewAuthor);
module.exports = authorsRouter;

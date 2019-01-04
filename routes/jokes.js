const jokesRouter = require("express").Router();
const path = require("path");
const {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke,
  sendVote
} = require("../controllers/jokes");

// display all jokes
jokesRouter.get("/all", sendAllJokes);
// get random joke - used to generate joke on homepage
jokesRouter.get("/random", sendRandomJoke);
// submit a joke page - not the post request
jokesRouter.get("/new", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../views/new.html"));
});

// save new joke
jokesRouter.post("/new", sendNewJoke);
// vote on joke, body should be {vote: up/down, jokeid: num}
jokesRouter.post("/vote", sendVote);

module.exports = jokesRouter;

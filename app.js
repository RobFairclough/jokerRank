const app = require("express")();
const bodyParser = require("body-parser");
const path = require("path");
const {
  sendAllJokes,
  sendRandomJoke,
  sendNewJoke,
  sendVote
} = require("./controllers/jokes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// home
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
// retrieve all
app.get("/api/all", sendAllJokes);
// get random joke - used to generate joke on homepage
app.get("/api/random", sendRandomJoke);
// submit a joke page
app.get("/api/new", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/new.html"));
});
// save new joke
app.post("/api/new", sendNewJoke);
// vote on joke, body should be {vote: up/down, jokeid: num}
// app.post("/api/vote", sendVote);

// 500 block error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = { app };

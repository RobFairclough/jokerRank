const app = require("express")();
const bodyParser = require("body-parser");
const path = require("path");
const {
  sendNew,
  sendAll,
  sendVote,
  sendRandom
} = require("./controllers/controller");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// home
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
// retrieve all
app.get("/api/all", sendAll);
// get random joke
app.get("/api/random", sendRandom);

app.get("/api/new", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/new.html"));
});

// new joke
app.post("/api/new", sendNew);
// vote on joke, body should be {vote: up/down, jokeid: num}
app.post("/api/vote", sendVote);

// 500 block error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = { app };

const fs = require("fs");

const getAll = cb => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    if (err) cb("error reading file");
    const jokes = JSON.parse(jokeFile);
    if (jokes.length) cb(null, JSON.stringify(jokes, null, 2));
    else cb("No jokes found");
  });
};
const getRandom = cb => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    const jokes = JSON.parse(jokeFile);
    if (!jokes.length) cb({ msg: "no jokes", status: 404 });
    else {
      const rand = Math.floor(Math.random() * jokes.length);
      cb(null, jokes[rand]);
    }
  });
};
const generateNew = (joke, author, cb) => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    // array of jokes
    let jokes = JSON.parse(jokeFile);
    // duplicate check
    if (jokes.find(q => q.joke.toLowerCase() === joke.toLowerCase())) {
      cb(null, "joke already exists");
    } else {
      if (!author) author = "Anonymous";
      const newjoke = {
        joke,
        author,
        score: 0,
        jokeid: jokes.length + 1
      };
      jokes.push(newjoke);
      const jokeFileToWrite = JSON.stringify(jokes, null, 2);
      fs.writeFile("./data/jokes.json", jokeFileToWrite, err => {
        if (err) cb("err writing file");
        else cb(null, newjoke);
      });
    }
  });
};

const applyVote = (vote, jokeid, cb) => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    const jokes = JSON.parse(jokeFile);
    const thisJoke = jokes.find(q => q.jokeid === jokeid);
    if (!thisJoke) cb("joke not found error");
    else if (vote === "up") thisJoke.score++;
    else {
      if (thisJoke.score <= 0) thisJoke.score = 0;
      else thisJoke.score--;
    }
    const jokesToWrite = JSON.stringify(jokes, null, 2);
    fs.writeFile("./data/jokes.json", jokesToWrite, err => {
      if (err) cb(err);
      else {
        cb(null, thisJoke);
      }
    });
  });
};

module.exports = { generateNew, applyVote, getAll, getRandom };

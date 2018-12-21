const fs = require("fs");

const getAll = cb => {
  fs.readFile("./data/jokes.json", jokeFile => {
    const jokes = JSON.parse(jokeFile);
    if (jokes.length) cb(null, JSON.stringify(jokes, null, 2));
    else cb("No jokes found");
  });
};

const getRandom = cb => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    const jokes = JSON.parse(jokeFile);
    console.log(jokes);
    if (!jokes.length) cb({ msg: "no jokes", status: 404 });
    else {
      const rand = Math.floor(Math.random() * jokes.length);
      console.log(rand);
      console.log(jokes[rand]);
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
      console.log(jokeFile);
      console.log(jokes);
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
        console.log(newjoke);
        if (err) cb(err);
        else cb(null, newjoke);
      });
    }
  });
};

const applyVote = (vote, jokeid, cb) => {
  fs.readFile("./data/jokes.json", (err, jokeFile) => {
    const jokes = JSON.parse(jokeFile);
    const thisjoke = jokes.find(q => q.jokeid === jokeid);
    if (!thisjoke) cb("joke not found error");
    else if (vote === "up") thisjoke.score++;
    else {
      if (thisjoke.score >= 0) thisjoke.score = 0;
      else thisjoke.score--;
    }
    const jokesToWrite = JSON.stringify(jokes, null, 2);
    fs.writeFile("./data/jokes.json", jokesToWrite, err => {
      if (err) cb(err);
      else {
        cb(
          null,
          `${vote}vote successful, "${thisjoke.joke}" is now at ${
            thisjoke.score
          } points!`
        );
      }
    });
  });
};

module.exports = { generateNew, applyVote, getAll, getRandom };

const fs = require("fs");

const getAll = cb => {
  fs.readFile("./data/quotes.json", quoteFile => {
    const quotes = JSON.parse(quoteFile);
    if (quotes.length) cb(null, JSON.stringify(quotes, null, 2));
    else cb("No quotes found");
  });
};

const getRandom = cb => {
  fs.readFile("./data/quotes.json", (err, quoteFile) => {
    const quotes = JSON.parse(quoteFile);
    console.log(quotes);
    if (!quotes.length) cb({ msg: "no quotes", status: 404 });
    else {
      const rand = Math.floor(Math.random() * quotes.length);
      console.log(rand);
      console.log(quotes[rand]);
      cb(null, quotes[rand]);
    }
  });
};

const generateNew = (quote, author, cb) => {
  fs.readFile("./data/quotes.json", (err, quoteFile) => {
    // array of quotes
    let quotes = JSON.parse(quoteFile);
    // duplicate check
    if (quotes.find(q => q.quote.toLowerCase() === quote.toLowerCase())) {
      cb(null, "Quote already exists");
    } else {
      console.log(quoteFile);
      console.log(quotes);
      if (!author) author = "Anonymous";
      const newQuote = {
        quote,
        author,
        score: 0,
        quoteid: quotes.length + 1
      };
      quotes.push(newQuote);
      const quoteFileToWrite = JSON.stringify(quotes, null, 2);
      fs.writeFile("./data/quotes.json", quoteFileToWrite, err => {
        console.log(newQuote);
        if (err) cb(err);
        else cb(null, newQuote);
      });
    }
  });
};

const applyVote = (vote, quoteid, cb) => {
  fs.readFile("./data/quotes.json", (err, quoteFile) => {
    const quotes = JSON.parse(quoteFile);
    const thisQuote = quotes.find(q => q.quoteid === quoteid);
    if (!thisQuote) cb("quote not found error");
    else if (vote === "up") thisQuote.score++;
    else {
      if (thisQuote.score >= 0) thisQuote.score = 0;
      else thisQuote.score--;
    }
    const quotesToWrite = JSON.stringify(quotes, null, 2);
    fs.writeFile("./data/quotes.json", quotesToWrite, err => {
      if (err) cb(err);
      else {
        cb(
          null,
          `${vote}vote successful, "${thisQuote.quote}" is now at ${
            thisQuote.score
          } points!`
        );
      }
    });
  });
};

module.exports = { generateNew, applyVote, getAll, getRandom };

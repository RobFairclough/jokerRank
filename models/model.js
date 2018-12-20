const fs = require("fs");

const generateNew = (quote, author, cb) => {
  // add quote ID
  fs.readFile(
    ("./data/quotes.json",
    quoteFile => {
      // array of quotes
      const quotes = JSON.parse(quoteFile);
      if (!author) author = "Anonymous";
      const newQuote = { quote, author, score: 0 };
      quotes.push(newQuote);
      const quoteFileToWrite = JSON.stringify(quotes, null, 2);
      fs.writeFile("./data/quotes.json", quoteFileToWrite, err => {
        if (err) cb(err);
        else cb(null, newQuote);
      });
    })
  );
};

const applyVote = (vote, quoteid, cb) => {
  fs.readFile("./data/quotes.json", quoteFile => {
    const quotes = JSON.parse(quoteFile);
    const thisQuote = quotes.find(q => q.quoteid === quoteid);
    if (!thisQuote) cb("quote not found error");
    else if (vote === "up") thisQuote.score++;
    else thisQuote.score--;
  });
};

module.exports = { generateNew, applyVote };

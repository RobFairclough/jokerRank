const { generateNew, applyVote } = require("../models/model");

const sendNew = (req, res, next) => {
  const quote = req.body.quote;
  const author = req.body.author;
  generateNew(quote, author, (err, done) => {
    if (err) next(err);
    // success, maybe display that quote
    else console.log("success"); //res.send();
  });
};

const sendVote = (req, res, next) => {
  const vote = req.body.vote;
  const quoteid = null; //find this
  applyVote(vote, quoteid, (err, done) => {
    if (err) next(err);
    else console.log(`successful ${vote}vote`);
  });
};

module.exports = { sendNew, sendVote };

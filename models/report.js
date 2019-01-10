const Twitter = require('twitter');
const tweet = text => {
  const config = {};
  if (process.env.NODE_ENV === 'production') {
    config.consumer_key = process.env.TWITTER_CONSUMER_KEY;
    config.consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
    config.access_token_key = process.env.TWITTER_ACCESS_TOKEN;
    config.access_token_secret = process.env.TWITTER_TOKEN_SECRET;
  } else {
    const {
      twitterKey,
      twitterSecretKey,
      twitterAccess,
      twitterAccessSecret
    } = require('../config');
    config.consumer_key = twitterKey;
    config.consumer_secret = twitterSecretKey;
    config.access_token_key = twitterAccess;
    config.access_token_secret = twitterAccessSecret;
  }
  const client = new Twitter(config);
  client
    .post('statuses/update', { status: text })
    .then(console.log)
    .catch(console.log);
};

const fileReport = (report, cb) => {
  const tweetReport = 'some whiny baby sent us a report that says: ' + report;
  tweet(tweetReport);
  cb(null, tweetReport);
};
module.exports = { tweet, fileReport };

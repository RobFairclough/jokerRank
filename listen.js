const app = require("./mainapp");

// normalise a port into a number, string or false
const normalisePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};
const port = normalisePort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var DB_CONFIG = process.env.DB_CONFIGURATION;
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

module.exports = app;

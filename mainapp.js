const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
// const { seedMeSeymour } = require('./controllers/jokes');

const { apiRouter } = require('./routes/api');
// fixing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// homepage
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});
// app.get('/seedmeseymour', seedMeSeymour);
app.use('/api', apiRouter);

// 500 block error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;

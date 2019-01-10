const app = require('express')();
const bodyParser = require('body-parser');
// const { seedMeSeymour } = require('./controllers/jokes');

const { apiRouter } = require('./routes/api');
// fixing

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// homepage
app.get('/', (req, res, next) => {
  res.render('pages/index.ejs');
});
app.get('/contact', (req, res, next) => {
  res.render('pages/contact.ejs');
});
// app.get('/seedmeseymour', seedMeSeymour);
app.use('/api', apiRouter);

// 500 block error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;

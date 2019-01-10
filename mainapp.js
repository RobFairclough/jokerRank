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
app.get('/report', (req, res, next) => {
  res.render('pages/report.ejs', { sent: false });
});
// app.get('/seedmeseymour', seedMeSeymour);
app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  res.status(404).render('pages/404.ejs');
});
// 500 block error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;

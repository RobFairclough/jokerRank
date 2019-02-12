const app = require('./mainapp');

const normalisePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};
const port = normalisePort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

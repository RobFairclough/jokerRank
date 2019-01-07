const app = require("./mainapp");

app.listen(9090, () => {
  console.log("listening");
});

module.exports = app;

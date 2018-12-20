const app = require("express")();
const bodyParser = require("body-parser");
const { sendNew } = require("./controllers");

app.use(bodyParser.json());
// home
app.get("/", (req, res, next) => {
  res.send(__dirname, "index.html");
});

// new quote
app.post("/api/new", sendNew);

module.exports = { app };

const { app } = require("./app");

app.listen(process.env.PORT || 8080, () => {
  console.log("listening");
});

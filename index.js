const express = require("express");
const constants = require("./constants");

const app = express();
app.listen(443, () => {
  console.log("App listening at 'http://localhost:443/'");
});

app.get("/calculations", (req, res) => {
  res.send({
    calculations: constants.SIMPLE_CALCULATIONS,
    answers: constants.SIMPLE_CALCULATIONS_ANSWERS,
  });
});

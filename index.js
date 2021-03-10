const express = require("express");

const app = express();
app.listen(443, () => {
  console.log("App listening at 'http://localhost:443/'");
});

app.get("/calculations", (req, res) => {
  res.send({ calculations: ["4+4", "9+3"] });
});

const express = require("express");
const cors = require("cors");
const calculationsRouter = require("./calculations/calculations.routes");
const usersRouter = require("./users/users.routes");
const DBConnection = require("./DBConnection");

DBConnection();

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.listen(443, () => {
  console.log("App listening at 'http://localhost:443/'");
});

app.use("/calculations", calculationsRouter);
app.use("/users", usersRouter);

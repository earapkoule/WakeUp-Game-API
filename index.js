const express = require("express");
const cors = require("cors");
const router = require("./calculations/routes");
const mongoose = require("mongoose");

const DBConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/wakeup-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("DB connected...");
};

DBConnection();

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.listen(443, () => {
  console.log("App listening at 'http://localhost:443/'");
});

app.use("/calculations", router);

const express = require("express");
const cors = require("cors");
const constants = require("./constants");
const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  calculation: String,
  answer: Number,
});
const Calculation = mongoose.model("Calculation", calculationSchema);

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

app.get("/calculations", (req, res) => {
  Calculation.find({}, (err, calculations) => {
    var calculationMap = {};

    calculations.forEach((calculation) => {
      calculationMap[calculation._id] = calculation;
    });

    res.send(calculationMap);
  });
});

app.post("/calculations", (req, res) => {
  const calc = new Calculation({
    calculation: req.body.calculation,
    answer: req.body.answer,
  });
  calc.save((err, newCalculation) => {
    if (err) console.log(err);
    res.send(newCalculation);
  });
});

app.delete("/calculations/:calculationId", (req, res) => {
  Calculation.findByIdAndRemove(req.params.calculationId, (err) => {
    console.log(err);
    res.send(req.params.calculationId);
  });
});

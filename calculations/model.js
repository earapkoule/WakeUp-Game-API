const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  calculation: String,
  answer: Number,
});
const Calculation = mongoose.model("Calculation", calculationSchema);

module.exports = Calculation;

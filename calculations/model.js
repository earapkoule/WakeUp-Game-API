const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  calculation: { type: String, required: true },
  answer: { type: Number, required: true },
});
const Calculation = mongoose.model("Calculation", calculationSchema);

module.exports = Calculation;

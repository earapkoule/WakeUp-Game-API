const express = require("express");
const router = express.Router();
const Calculation = require("./model");

// CREATE
router.post("/", (req, res) => {
  const calc = new Calculation({
    calculation: req.body.calculation,
    answer: req.body.answer,
  });
  calc.save((err, newCalculation) => {
    if (err) console.log(err);
    res.send(newCalculation);
  });
});

// READ
router.get("/", (req, res) => {
  Calculation.find({}, (err, calculations) => {
    var calculationMap = {};

    calculations.forEach((calculation) => {
      calculationMap[calculation._id] = calculation;
    });
    if (err) console.log(err);
    res.send(calculationMap);
  });
});

// UPDATE
router.patch("/:calculationId", (req, res) => {
  // Users can send only the property they want to update
  const updatedCalculation = {};
  if (req.body && req.body.calculation) {
    updatedCalculation.calculation = req.body.calculation;
  }
  if (req.body && req.body.answer) {
    updatedCalculation.answer = req.body.answer;
  }

  Calculation.findByIdAndUpdate(
    req.params.calculationId,
    { $set: updatedCalculation },
    (err) => {
      if (err) console.log(err);
      res.send(req.params.calculationId);
    }
  );
});

// DELETE
router.delete("/:calculationId", (req, res) => {
  Calculation.findByIdAndRemove(req.params.calculationId)
    .then(() => res.send(req.params.calculationId))
    .catch(() => res.sendStatus(400));
});

// DELETE ALL
router.delete("/", (req, res) => {
  Calculation.deleteMany({})
    .then(() => res.send("ok!"))
    .catch(() => res.sendStatus(400));
});

module.exports = router;

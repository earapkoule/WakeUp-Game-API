const express = require("express");
const calculationsRouter = express.Router();
const Calculation = require("./calculations.model");

// CREATE
calculationsRouter.post("/", (req, res) => {
  const calc = new Calculation({
    calculation: req.body.calculation,
    answer: req.body.answer,
  });
  calc
    .save()
    .then((newCalculation) => {
      res.send(newCalculation);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// READ
calculationsRouter.get("/", (req, res) => {
  Calculation.find({})
    .then((calculations) => {
      var calculationMap = {};

      calculations.forEach((calculation) => {
        calculationMap[calculation._id] = calculation;
      });
      res.send(calculationMap);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// UPDATE
calculationsRouter.patch("/:calculationId", (req, res) => {
  // Users can send only the property they want to update
  const updatedCalculation = {};
  if (req.body && req.body.calculation) {
    updatedCalculation.calculation = req.body.calculation;
  }
  if (req.body && req.body.answer) {
    updatedCalculation.answer = req.body.answer;
  }

  Calculation.findByIdAndUpdate(req.params.calculationId, {
    $set: updatedCalculation,
  })
    .then(() => res.send(req.params.calculationId))
    .catch(() => res.sendStatus(400));
});

// DELETE
calculationsRouter.delete("/:calculationId", (req, res) => {
  Calculation.findByIdAndRemove(req.params.calculationId)
    .then(() => res.send(req.params.calculationId))
    .catch(() => res.sendStatus(400));
});

// DELETE ALL
calculationsRouter.delete("/", (req, res) => {
  Calculation.deleteMany({})
    .then(() => res.send("ok!"))
    .catch(() => res.sendStatus(400));
});

module.exports = calculationsRouter;

const express = require("express");
const usersRouter = express.Router();
const User = require("./users.model");

// CREATE
usersRouter.post("/", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user
    .save()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// READ
usersRouter.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      var userMap = {};

      users.forEach((user) => {
        userMap[user._id] = user;
      });
      res.send(userMap);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// UPDATED
usersRouter.patch("/:userId", (req, res) => {
  // Users can send only the property they want to update
  const updatedUser = {};
  if (req.body && req.body.firstName) {
    updatedUser.firstName = req.body.firstName;
  }
  if (req.body && req.body.lastName) {
    updatedUser.lastName = req.body.lastName;
  }

  User.findByIdAndUpdate(req.params.userId, {
    $set: updatedUser,
  })
    .then(() => res.send(req.params.userId))
    .catch(() => res.sendStatus(400));
});

// DELETE
usersRouter.delete("/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(() => res.send(req.params.userId))
    .catch(() => res.sendStatus(400));
});

// DELETE ALL
usersRouter.delete("/", (req, res) => {
  User.deleteMany({})
    .then(() => res.send("ok!"))
    .catch(() => res.sendStatus(400));
});

module.exports = usersRouter;

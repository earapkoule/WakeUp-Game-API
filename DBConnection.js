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

module.exports = DBConnection;

const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/food", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;

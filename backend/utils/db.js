const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGODB, {})
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;

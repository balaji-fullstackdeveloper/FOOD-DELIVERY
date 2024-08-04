const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Salad",
        "Rolls",
        "Deserts",
        "Sandwich",
        "Cake",
        "Pure Veg",
        "Pasta",
        "Noodles",
      ],
      message: "Please select correct category",
    },
  },
  ratings: {
    type: Number,
    required: true,
    default: 0,
  },
});

const schema = mongoose.models.food || mongoose.model("food", productSchema);
module.exports = schema;

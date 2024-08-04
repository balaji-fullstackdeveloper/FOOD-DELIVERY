const food_list = require("./data");
const Product = require("../model/produtModel");
const connectDatabase = require("../utils/db.js");
connectDatabase();
const seeder = async () => {
  try {
    await Product.deleteMany();
    console.log("All products deleted");
    await Product.insertMany(food_list);
    console.log("Product Inserted successful");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};
seeder();

const foodModel = require("../model/produtModel");
const fs = require("fs");

//Add food in admin panel
//http://localhost:8000/api/food/add
exports.addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "error" });
  }
};

//List food in admin panel
//http://localhost:8000/api/food/list
exports.listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Error" });
  }
};

//Remove food in admin panel
//http://localhost:8000/api/food/remove
exports.removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Error" });
  }
};

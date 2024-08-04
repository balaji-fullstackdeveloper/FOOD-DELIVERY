const express = require("express");
const {
  loginUser,
  registerUser,
  loginadmin,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/loginadmin", loginadmin);

module.exports = userRouter;

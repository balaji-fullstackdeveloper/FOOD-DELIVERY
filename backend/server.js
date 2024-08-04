const express = require("express");
const cors = require("cors");
const connectDatabase = require("./utils/db");
const foodRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "utils/config.env") });

const app = express();

app.use(cors());
app.use(express.json());
connectDatabase();
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server running on port " + port);
});

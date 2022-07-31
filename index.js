const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const { router: productsRouter } = require("./routes/products.router");
const { router: cartRouter } = require("./routes/cart.router");
const { router: signupRouter } = require("./routes/signup.router");
const { router: loginRouter } = require("./routes/login.router");
const { router: wishlistRouter } = require("./routes/wishlist.router");
const { router: addressRouter } = require(`./routes/address.router`);
const { router: paymentRouter } = require(`./routes/payment.router`);
const { router: couponRouter } = require(`./routes/coupon.router`);

const {
  routeNotFoundHandler,
} = require("./middlewares/route-not-found-handler.middleware");
const { errorHandler } = require("./middlewares/error-handler.middleware");

const { initializeDatabase } = require("./db/db.connect");
const { authVerify } = require("./middlewares/authVerify.middleware");

dotenv.config();
app.use(express.json());
app.use(cors());

initializeDatabase();
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "server is up and running from dev server..!",
  });
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use(`/address`, addressRouter);
app.use(`/payment`, authVerify, paymentRouter);
app.use(`/coupon`, couponRouter);

// PLEASE DON'T MOVE.
app.use(routeNotFoundHandler);

app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port :${PORT}`);
});

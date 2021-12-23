const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const { router: productsRouter } = require("./routes/products.router");
const { router: cartRouter } = require("./routes/cart.router");
const { router: signupRouter } = require("./routes/signup.router");
const { router: loginRouter } = require("./routes/login.router");

const {
  routeNotFound,
} = require("./middlewares/route-not-found-handler.middleware");
const { errorHandler } = require("./middlewares/error-handler.middleware");

const { initializeDatabase } = require("./db/db.connect");

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
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

// PLEASE DON'T MOVE.
app.use(routeNotFound);

app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port :${PORT}`);
});

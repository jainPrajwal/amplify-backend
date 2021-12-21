const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const { router: productsRouter } = require("./routes/products.router");
const { router: cartRouter } = require("./routes/cart.router");
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

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port :${PORT}`);
});

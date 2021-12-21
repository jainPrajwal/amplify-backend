const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const { router: productsRouter } = require("./routes/products.router");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "server is up and running from dev server..!",
  });
});

app.use("/products", productsRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port :${PORT}`);
});

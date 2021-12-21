const express = require("express");
const { getAllItemsInCartByCartId } = require("./controllers/cart.controller");
const router = express.Router();

router.get("/:cartId", async (req, res) => {
  try {
    await getAllItemsInCartByCartId(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { router };

const express = require("express");
const {
  getAllItemsInCartByUser,
  saveItemToDatabase,
  updateItemInDatabase,
  removeItemFromDatabase,
} = require("../controllers/cart.controller");
const { authVerify } = require("../middlewares/authVerify.middleware");
const { cartHandler } = require("../middlewares/cart-handler.middleware");

const router = express.Router();

router.param("userId", authVerify);
router.param("userId", cartHandler);
router
  .route("/:userId")
  .get(async (req, res) => {
    try {
      await getAllItemsInCartByUser(req, res);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    const productToBeSaved = req.body;
    try {
      await saveItemToDatabase(req, res, productToBeSaved);
    } catch (error) {
      console.error(error);
    }
  });

router
  .route("/:userId/:productId")
  
  .post(async (req, res) => {
    const updatedMetricsFromClient = req.body;
    await updateItemInDatabase(req, res, updatedMetricsFromClient);
  })
  .delete(async (req, res) => {
    await removeItemFromDatabase(req, res);
  });

module.exports = { router };

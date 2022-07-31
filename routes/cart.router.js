const express = require("express");
const {
  getAllItemsInCartByUser,
  saveItemToDatabase,
  updateItemInDatabase,
  removeItemFromDatabase,
} = require("../controllers/cart.controller");
const { authVerify } = require("../middlewares/authVerify.middleware");
const { cartHandler } = require("../middlewares/cart-handler.middleware");
const {User} = require(`../models/user.model`)

const router = express.Router();

router.post(`/clear`, authVerify, async (req, res) => {
  try {
    const { user } = req;
    console.log(`USER `, user)
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        cart: null,
      },
      {
        new: true,
      }
    );
 
    res.status(201).json({
      success: true,
      message: `cart cleared successfully`,
      user: updatedUser
    });
  } catch (error) {
    console.error(`error `, error);
    res.json({
      success: false,
      message: `something went wrong `,
      errorMessage: error.message,
    });
  }
});
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

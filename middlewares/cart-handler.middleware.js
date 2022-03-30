
const { Cart } = require("../models/cart.model");
const { findCartByUser } = require("../utils/cart.utils");
const { findUserByUserId } = require("../utils/user.utils");

const getOrCreateCart = async (req, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByUserId(userId);
    const cart = await findCartByUser(user);
    let updatedCart = [];
    console.log("from getOrCreateCaer", { cart });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found..!",
      });
    }
    if (cart) {
      updatedCart = await cart.populate({
        path: "cartItems",
      });
    } else {
      const newCartObj = { cartItems: [] };
      updatedCart = await new Cart(newCartObj).save().populate("cartItems");
      user.cart = updatedCart;
      await user.save();
    }

    req.cart = updatedCart;
    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: "something went wrong while finding your account..!",
    });
  }
};

const cartHandler = async (req, res, next) => {
  console.log("cartHandler")
  try {
    await getOrCreateCart(req, next);
  } catch (error) {
    return res.json({
      success: false,
      message: "somehting went wrong..!",
      errorMessage: error.message,
    });
  }
};

module.exports = { cartHandler };

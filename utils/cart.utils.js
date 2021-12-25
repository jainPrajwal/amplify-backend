const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");

const findCartByCartId = async (cartId) => {
  try {
    return await Cart.findById(cartId);
  } catch (error) {
    console.error(error);
  }
};

const findCartByUser = async (user) => {
  try {
    return await Cart.findById(user.cart);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somethin went wrong while fetching your cart..!",
    });
  }
};

module.exports = { findCartByCartId, findCartByUser };

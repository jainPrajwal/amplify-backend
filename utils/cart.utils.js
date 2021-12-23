const { Cart } = require("../models/cart.model");

const findCartByCartId = async (cartId) => {
  try {
    return await Cart.findById(cartId);
  } catch (error) {
    console.error(error);
  }
};

const findCartByUser = async (user) => {
  try {
    const foundCart = await Cart.findOne({ cart: user.cart });
    console.log("foundCart line 14 cart.utils", foundCart);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somethin went wrong while fetching your cart..!",
    });
  }
};

module.exports = { findCartByCartId,findCartByUser };

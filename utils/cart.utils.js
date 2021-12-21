const { Cart } = require("../models/cart.model");

const findCartByCartId = async (cartId) => {
  try {
    return await Cart.findById(cartId);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { findCartByCartId };

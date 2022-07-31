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
    return await Cart.findById(user.cart);
  } catch (error) {
   console.error(`error `, error)
  }
};

module.exports = { findCartByCartId, findCartByUser };

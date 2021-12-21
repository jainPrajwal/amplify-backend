const { findCartByCartId } = require("../../utils/cart.utils");

const getAllItemsInCartByCartId = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await findCartByCartId(cartId);
    if (cart) {
      res.json({
        success: true,
        message: "cart found",
        cart: await cart.populate("cartItems"),
      });
    } else {
      res.json({
        success: false,
        message: "cart not found..!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllItemsInCartByCartId };

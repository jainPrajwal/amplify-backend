const { findCartByCartId } = require("../utils/cart.utils");
const { findUserByUserId } = require("../utils/user.utils");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { CartItem } = require("../models/cartItem.model");

const getAllItemsInCartByCart = async (req, res) => {
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

const getAllItemsInCartByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await findUserByUserId(userId);

    const cart = await user.populate({
      path: "cart",
      populate: {
        path: "cartItems",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found..!",
      });
    }
    return res.json({
      success: true,
      message: "user found",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: "something went wrong while finding your account..!",
    });
  }
};

const increaseQuantityOfProductInRespectiveColor = (product) => {
  const updatedAvailableColors = product.availableColors.map((colorObj) => {
    if (colorObj.color === product.color) {
      return {
        ...colorObj,
        quantityOfItemInRespectiveColor:
          colorObj.quantityOfItemInRespectiveColor + 1,
      };
    }
    return colorObj;
  });

  return {
    ...product,
    availableColors: updatedAvailableColors,
    totalQuantity: product.totalQuantity + 1,
  };
};

const saveItemToDatabase = async (req, res, productToBeSaved) => {
  try {
    const updatedProduct =
      increaseQuantityOfProductInRespectiveColor(productToBeSaved);

    const savedCartItem = await new CartItem(updatedProduct).save();
    res.status(201).json({
      succeess : true,
      message : "carItem Saved!",
      cartItem: savedCartItem,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong..!",
    });
  }
};


const updateItemInDatabase = async (req, res, updatedMetricsFromClient) => {
  try {
    const { userId, productId } = req.params;
    let oldCartItem = await CartItem.findById(productId);
    oldCartItem.totalQuantity = updatedMetricsFromClient.totalQuantity;
    oldCartItem.availableColors.forEach((colorObj) => {
      if (colorObj.color === updatedMetricsFromClient.colorObj.color) {
        colorObj.quantityOfItemInRespectiveColor =
          updatedMetricsFromClient.colorObj.quantityOfItemInRespectiveColor;
      }
    });
    const newCartItem = await oldCartItem.save();

    res.json({
      success: true,
      message: "product in cart updated",
      newCartItem: oldCartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllItemsInCartByCart,
  getAllItemsInCartByUser,
  saveItemToDatabase,
  updateItemInDatabase,
};

const { findCartByCartId } = require("../utils/cart.utils");
const { findUserByUserId } = require("../utils/user.utils");
const { findCartByUser } = require("../utils/cart.utils");
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
  return res.json({
    success: true,
    message: "cart found",
    cart: req?.cart,
  });
  
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

      
    const savedItemToCart = await new CartItem(updatedProduct).save();
    const user = req.user;
    const cart = await findCartByUser(user);
    //if cart does not exist for the user create a new one
    if (!cart) {
      const newCartObj = { cartItems: [savedItemToCart._id] };
      const newCart = await new Cart(newCartObj).save();
      user.cart = newCart;
      await user.save();
    } else {
      //just add the cartItemId
      cart.cartItems.push(savedItemToCart._id);
      
      await cart.save();
    }

    res.status(201).json({
      succeess: true,
      message: "carItem Saved!",
      cartItem: savedItemToCart,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong..!",
      errorMessage: error.message,
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
      newCartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      errorMessage: error.message,
    });
  }
};

const removeItemFromDatabase = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = req.user;
    await CartItem.deleteOne({ _id: productId });
    const cart = await findCartByUser(user);
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found..!",
      });
    }
    const updatedCartItems = cart.cartItems.filter(
      (itemInCart) => itemInCart != productId
    );
    cart.cartItems = updatedCartItems;
    await cart.save();

    res.json({
      success: true,
      message: "cartItem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while removing item from cart",
      errorMessage: error.message,
    });
  }
};

const checkIfUserHasCart = async (user) => {
  const cart = await findCartByUser(user);
  
};

module.exports = {
  getAllItemsInCartByCart,
  getAllItemsInCartByUser,
  saveItemToDatabase,
  updateItemInDatabase,
  checkIfUserHasCart,
  removeItemFromDatabase,
};

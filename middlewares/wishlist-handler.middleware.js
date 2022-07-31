const res = require("express/lib/response");
const { Wishlist } = require("../models/wishlist.model");
const { findUserByUserId } = require("../utils/user.utils");
const { findWishlistByUser } = require("../utils/wishlist.utils");

const getOrCreateWishlist = async (req, res, next) => {
  
  const { userId } = req.params;
  let updatedWishlist = [];

  try {
    const user = await findUserByUserId(userId);
    if (!user) {
      return res.json({
        success: false,
        error: "user not found..!",
      });
    } else {
      const wishlist = await findWishlistByUser(user);
      if (wishlist) {
        updatedWishlist = await wishlist.populate("wishlistItems");
      } else {
        const newWishlist = new Wishlist({
          wishlistItems: [],
        });
        updatedWishlist = await newWishlist.save();
        user.wishlist = updatedWishlist;
        await user.save();
      }
      req.wishlist = await updatedWishlist.populate("wishlistItems");
      
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: "something went wrong while finding your account..!",
    });
  }
};

const wishlistHandler = async (req, res, next) => {
  try {
    await getOrCreateWishlist(req,res, next);
  } catch (error) {
    res.json({
      success: false,
      message: "somehting wen wrong..!",
      errorMessage: error.message,
    });
  }
};

module.exports = { wishlistHandler };

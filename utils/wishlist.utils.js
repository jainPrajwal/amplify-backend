const { Wishlist } = require("../models/wishlist.model");
const { WishlistItem } = require("../models/wishlistItem.model");

const findWishlistByUser = async (user) => {
  try {
    return await Wishlist.findById(user.wishlist);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somehting went wrong while fetching your wishlist..!",
      errorMessage: error.message,
    });
  }
};

const findWishlistItemByWishlistId = async (wishlistedItemId) => {
  try {
    return await WishlistItem.findById(wishlistedItemId);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somethinhg went wrong while finding your wishlisted Item",
      errorMessage: error.message,
    });
  }
};

module.exports = { findWishlistByUser, findWishlistItemByWishlistId };

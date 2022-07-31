const { Wishlist } = require("../models/wishlist.model");
const { WishlistItem } = require("../models/wishlistItem.model");
const {
  findWishlistByUser,
  findWishlistItemByWishlistId,
} = require("../utils/wishlist.utils");

const getAllWishlistItemsByUser = async (req, res) => {
  
  try {
    res.json({
      success: true,
      wishlist: await req?.wishlist?.populate("wishlistItems"),
      message: "your wishlist is here..!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "somehting went wrong while fetching your wishlist..!",
      errorMessage: error.message,
    });
  }
};

const saveWishlistItemToDatabase = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    const savedWishlistItem = await new WishlistItem(body).save();
    const wishlist = await findWishlistByUser(user);
    if (!wishlist) {
      const newWishlist = new Wishlist({
        wishlistItems: [savedWishlistItem._id],
      });
      const savedWishlist = await newWishlist.save();
      user.wishlist = savedWishlist;
      await user.save();
      res.status(201).json({
        success: true,
        message: "new Wishlist created",
        wishlist: await newWishlist.populate("wishlistItems"),
      });
    } else {
      wishlist.wishlistItems.push(savedWishlistItem._id);
      await wishlist.save();
      res.json({
        success: true,
        message: "wishlist updated",
        wishlist: await wishlist.populate("wishlistItems"),
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while saving item to Wishlist",
      errorMessage: error.message,
    });
  }
};

const removeWishlistedItemFromDatabase = async (req, res) => {
  const { wishlistedItemId } = req.params;
  
  const user = req.user;
  try {
    const wishlist = await findWishlistByUser(user);
    const wishlistItem = await findWishlistItemByWishlistId(wishlistedItemId);
    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "wishlistItem not found..!",
      });
    }
    

    await WishlistItem.deleteOne({ _id: wishlistedItemId });

    const updatedWishlistItems = wishlist.wishlistItems.filter(
      (itemInWishlist) => {
        
        return itemInWishlist._id != wishlistedItemId;
      }
    );
    
    wishlist.wishlistItems = updatedWishlistItems;
    await wishlist.save();

    res.json({
      success: true,
      message: "item removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "somehthing went wrong while removing wishlisted Item from Database",
      errorMessage: error.message,
    });
  }
};
module.exports = {
  getAllWishlistItemsByUser,
  saveWishlistItemToDatabase,
  removeWishlistedItemFromDatabase,
};

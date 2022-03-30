const express = require("express");
const {
  getAllWishlistItemsByUser,
  saveWishlistItemToDatabase,
  removeWishlistedItemFromDatabase,
} = require("../controllers/wishlist.controller");
const { authVerify } = require("../middlewares/authVerify.middleware");
const { wishlistHandler } = require("../middlewares/wishlist-handler.middleware");
const router = express.Router();

router.param("userId", authVerify);
router.param("userId", wishlistHandler);
router
  .route("/:userId")
  .get(async (req, res) => {
    await getAllWishlistItemsByUser(req, res);
  })
  .post(async (req, res) => {
    await saveWishlistItemToDatabase(req, res);
  });

router.delete("/:userId/:wishlistedItemId", async (req, res) => {
 
  await removeWishlistedItemFromDatabase(req, res);
});

module.exports = { router };

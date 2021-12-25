const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    wishlistItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "WishlistItem",
      },
    ],
  },
  {
    collection: "wishlist",
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = { Wishlist };

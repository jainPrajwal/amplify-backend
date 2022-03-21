const mongoose = require("mongoose");
require("mongoose-type-url");
const { Schema } = mongoose;

const WishlistItemSchema = new Schema({
  productId: String,
  name: String,
  category: String,
  subcategory: String,
  brand: String,
  image: mongoose.SchemaTypes.Url,
});

const WishlistItem = mongoose.model("WishlistItem", WishlistItemSchema);
module.exports = { WishlistItem };

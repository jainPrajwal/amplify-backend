const mongoose = require("mongoose");
const { Schema } = mongoose;

const ColorSchema = new Schema({
  color: String,
  maxQuantityOfItemInRespectiveColor: Number,
  maxQuantityOfItemInRespectiveColor: Number,
});

const CartItemSchema = new Schema(
  {
    name: String,
    image: String,
    sellingPrice: Number,
    price: Number,
    brand: String,
    fastDelivery: Boolean,
    color: String,
    totalAvailableQuantity: Number,
    totalQuantity: Number,
    availableColors: {
      type: [ColorSchema],
      default: undefined,
    },
    ratings: Number,
    category: String,
    subcategory: String,
    offer: String,
  },
);

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = { CartItem , ColorSchema};

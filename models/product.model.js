const mongoose = require("mongoose");
const { ColorSchema } = require("./cartItem.model");
const { Schema } = mongoose;
const ProductSchema = new Schema({
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
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };

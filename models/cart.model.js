const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
  },
  {
    collection: "cart",
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };

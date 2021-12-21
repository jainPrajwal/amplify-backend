
const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
  },
  username: {
    type: String,
    required: "email/username is required",
    unique : true
  },
  password: {
    type: String,
    required: "password is required",
    unique : true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };

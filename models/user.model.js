const mongoose = require("mongoose");
const UserSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
  },
  username: {
    type: String,
    required: "email/username is required",
  },
  password: {
    type: String,
    required: "password is required",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };

const { User } = require("../models/user.model");
const findUserByUserId = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findUserByUsername = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { findUserByUserId, findUserByUsername };

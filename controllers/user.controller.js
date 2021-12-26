const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByUserId, findUserByUsername } = require("../utils/user.utils");

const saveUserToDatabase = async (req, res) => {
  let userToBeAdded = req.body;
  try {
    //generate salt
    const salt = await bcrypt.genSalt(10); //default is 10

    //set hashed password
    userToBeAdded.password = await bcrypt.hash(userToBeAdded.password, salt);

    //save the user
    const savedUser = await new User(userToBeAdded).save();
    if (savedUser) {
      req.user = savedUser;
      res.status(201).json({
        success: true,
        message: "user signed up successfully",
        user: savedUser,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User Unauthorized.Signup failed..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while signing up..!",
      errorMessage: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let userLoggingIn = req.body;

    const userFound = await findUserByUsername(userLoggingIn.username);

    if (!userFound) {
      return res.json({
        success: false,
        message: "user not found..!",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      userLoggingIn.password,
      userFound.password
    );
    if (isPasswordValid) {
      const payload = { userId: userFound._id };
      const token = await jwt.sign(payload, process.env["mySecret"], {
        expiresIn: "24h",
      });
      res.json({
        success: true,
        message: "user logged in successfully",
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "password is invalid..!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong while logging in",
      errorMessage: error.message,
    });
  }
};

module.exports = { saveUserToDatabase, loginUser };

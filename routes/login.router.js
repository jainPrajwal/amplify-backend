const express = require("express");
const { loginUser } = require("../controllers/user.controller");
const { User } = require("../models/user.model");

const router = express.Router();

router
  .route("/")
  .get(async (req,res) => {
    res.json({
      users: await User.find({})
    })
  })
  .post(async (req, res) => {
    await loginUser(req,res);
  });

module.exports = { router };

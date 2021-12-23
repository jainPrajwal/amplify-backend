const express = require("express");
const { loginUser } = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get()
  .post(async (req, res) => {
    await loginUser(req,res);
  });

module.exports = { router };

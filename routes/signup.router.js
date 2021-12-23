const express = require("express");
const { saveUserToDatabase } = require("../controllers/user.controller");
const router = express.Router();
router
  .route("/")
  .get((req, res) => {})
  .post(async (req, res) => {
    await saveUserToDatabase(req, res);
  });

module.exports = { router };

const express = require("express");

const cartHandler = async (req, res, next) => {
  try {
    // await checkIfUserHasCart();
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "somehting went wrong..!",
      errorMessage: error.message,
    });
  }
};

module.exports = { cartHandler };

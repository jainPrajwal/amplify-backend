const express = require("express");


const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "some error ocuured...!Try after some time",
    errorMessage: error.message,
  });
};

module.exports = { errorHandler };

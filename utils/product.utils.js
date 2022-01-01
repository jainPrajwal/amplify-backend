const { Product } = require("../models/product.model");
const getProductByProductId = async (productId) => {
  try {
    return await Product.findById(productId);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while getting product",
      errorMessage: error.message,
    });
  }
};

const getAllProducts = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while getting products",
      errorMessage: error.message,
    });
  }
};

module.exports = { getProductByProductId, getAllProducts };

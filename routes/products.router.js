const products = [
  {
    id: "p-1",
    name: "boat Rockerz 330",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main3_a08fff6a-7c3d-4663-9499-3421df127e94_300x.png?v=1622014963",
    sellingPrice: 1299,
    price: 2990,
    brand: "Boat",
    fastDelivery: true,
    color: "red",
    totalAvailableQuantity: 10,
    totalQuantity: 0,
    availableColors: [
      {
        colorId: "c1",
        color: "red",
        maxQuantityOfItemInRespectiveColor: 3,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: "c2",
        color: "blue",
        maxQuantityOfItemInRespectiveColor: 4,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: "c3",
        color: "white",
        maxQuantityOfItemInRespectiveColor: 3,
        quantityOfItemInRespectiveColor: 0,
      },
    ],
    ratings: 3,
    category: "earphones",
    subcategory: "wired",
    offer: "Save 50",
  },
  {
    id: "p-2",
    name: "boat Rockerz 330",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main3_a08fff6a-7c3d-4663-9499-3421df127e94_300x.png?v=1622014963",
    sellingPrice: 1299,
    price: 2990,
    brand: "Boat",
    fastDelivery: true,
    color: "red",
    totalAvailableQuantity: 11,
    totalQuantity: 0,
    availableColors: [
      {
        colorId: "c1",
        color: "red",
        maxQuantityOfItemInRespectiveColor: 2,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: "c2",
        color: "blue",
        maxQuantityOfItemInRespectiveColor: 4,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: "c3",
        color: "white",
        maxQuantityOfItemInRespectiveColor: 5,
        quantityOfItemInRespectiveColor: 0,
      },
    ],
    ratings: 3,
    category: "headphones",
    subcategory: "wired",
    offer: "Save 50",
  },
];

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductByProductId,
} = require("../utils/product.utils");

router.get("/",async (req, res) => {
  const products = await getAllProducts();
  try {
    res.json({
      success: true,
      message: "getting started is hard!",
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      error: "somethign went wrong getting products..!",
      errorMessage: error.message,
    });
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await getProductByProductId(productId);
    return product
      ? res.json({
          success: true,
          message: "product found..!",
          product,
        })
      : res.json({
          success: false,
          message: "product not found..!",
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while getting your products",
      errorMessage: error.message,
    });
  }
});

module.exports = { router };

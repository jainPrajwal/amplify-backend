const express = require(`express`);
const Razorpay = require(`razorpay`);
const crypto = require(`crypto`);
const { PaymentModel } = require("../models/payment.model");
const { CartItem } = require("../models/cartItem.model");

const router = express.Router();

router
  .get(`/`, async (req, res) => {
    const { user } = req;
    try {
      const foundPayments = await PaymentModel.find({ user: user._id }).populate(
        {
          path: `items`,
          model: CartItem,
        }
      );
      if (!foundPayments) {
        res.status(404).json({
          status: 404,
          success: false,
          message: `Payment Not Found`,
        });
        return;
      }

      res.status(200).json({
        status: 200,
        success: true,
        message: `Payment Details found`,
        payments: foundPayments,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: `somehting went wrong while fethcing the patment details`,
        errorMessage: error.message,
      });
    }
  })
  .post(`/`, async (req, res) => {
    const {
      user,
      body: { amount },
    } = req;
    console.log(`amount `, amount);
    if (amount === null || amount === undefined) {
      res.status(400).json({
        success: false,
        message: `amount not found. Invalid Syntax`,
      });
      return;
    }
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: `INR`,
      receipt: `receipt_order_1234`,
    };
try {
  const order = await instance.orders.create(options);
  if (!order) {
    res.status(500).json({
      status: 500,
      success: false,
      message: `something went wrong while generating order`,
    });
    return;
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: `order generated successfully`,
    order,
  });
}catch(error) {
  console.error(`error `, error)
res.status(500).json({
  success: false,
  message: `somehting went wrong`,
  errorMessage: error.message
})
}
   
  });

router.post(`/verify`, async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    orderedItems,
  } = req.body;

  const { user } = req;

  let body = orderCreationId + "|" + razorpayPaymentId;

  let expectedSignature = crypto
    .createHmac(`sha256`, process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest(`hex`);

  if (expectedSignature === razorpaySignature) {
    const paymentToBeSavedToDatabase = {
      order_id: orderCreationId,
      payment_id: razorpayPaymentId,
      payment_signature: razorpaySignature,
      user: user._id,
      items: orderedItems,
    };

    try {
      const savedPayment = await PaymentModel(
        paymentToBeSavedToDatabase
      ).save();
      res.status(201).json({
        status: 201,
        message: `Yay!`,
        payment: await savedPayment.populate({
          path: `items`,
          model: CartItem,
        }),
      });
    } catch (error) {
      console.error(
        `somehting went wrrong while saveing payment to database`,
        error
      );
    }
  } else {
    console.error(`somehthing went wrong :(`);
    res.status(500).json({
      message: `:(`,
    });
  }
});

module.exports = { router };

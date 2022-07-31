const express = require(`express`);
const { authVerify } = require("../middlewares/authVerify.middleware");
const { CouponModel } = require("../models/coupon.model");
const router = express.Router();

router
  .route(`/`)
  .get(authVerify, async (req, res) => {
    try {
      const { user } = req;
      const appliedCoupon = await CouponModel.findOne({
        user: user._id,
      });
      if (appliedCoupon) {
        res.status(200).json({
          success: true,
          message: `coupon fetched successfully`,
          coupon: appliedCoupon,
        });
        return;
      }
      res.status(404).json({
        success: false,
        message: `coupon not found`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `somehting went wrong while fetching coupon`,
        errorMessage: error.message,
      });
    }
  })
  .post(authVerify, async (req, res) => {
    try {
      const {
        body: { email, coupon },
        user,
      } = req;
      if (!coupon || !email) {
        res.status(400).json({
          success: false,
          message: `email or coupon missing`,
        });
        return;
      }
      let couponGeneratedButNotApplied = null;
      console.log(`user `, user);
      if (user.username === email) {
        try {
          couponGeneratedButNotApplied = await CouponModel.findOne({
            email,
            isApplied: false,
          });
          console.log(
            `couponGeneratedButNotApplied `,
            couponGeneratedButNotApplied
          );
          if (couponGeneratedButNotApplied) {
            res.status(409).json({
              success: false,
              message: `a coupon is already generated`,
            });
            return;
          }

          try {
            coupon.user = user._id;
            const appliedCoupon = await CouponModel(coupon).save();
            if (appliedCoupon) {
              res.status(201).json({
                success: true,
                message: `coupon generated successfully`,
                coupon: appliedCoupon,
              });
              return;
            }
            res.status(400).json({
              success: false,
              message: `coupon not generated`,
            });
          } catch (error) {
            console.error(
              `something went wrong while generating coupon`,
              error
            );
            res.status(500).json({
              success: false,
              message: `something went wrong while generating coupon`,
              errorMessage: error.message,
            });
          }
        } catch (error) {
          console.error(`somehting is wrong `, error);
          res.status(500).json({
            success: false,
            message: `coupon does not exist`,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `somehting went wrong while generating coupons`,
        errorMessage: error.message,
      });
    }
  });

router
  .route(`/:couponId`)
  .post(authVerify, async (req, res) => {
    try {
      const {
        user,
        params: { couponId },
      } = req;

      const updatedCoupon = await CouponModel.findOneAndUpdate(
        { _id: couponId },
        {
          isApplied: true,
        },
        { new: true }
      );
      if (updatedCoupon) {
        res.status(201).json({
          success: false,
          message: `coupon applied successfully`,
          coupon: updatedCoupon,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: `coupon not applied`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `somehting went wrong while applying coupon`,
        errorMessage: error.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        user,
        params: { couponId },
      } = req;

      const deletedCoupon = await CouponModel.findOneAndDelete({
        _id: couponId,
      });
      if (deletedCoupon) {
        res.status(200).json({
          success: false,
          message: `coupon used successfully`,
          coupon: deletedCoupon,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: `coupon not used`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `somehting went wrong while using coupon`,
        errorMessage: error.message,
      });
    }
  });

module.exports = { router };

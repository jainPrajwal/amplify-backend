const express = require(`express`);
const { authVerify } = require("../middlewares/authVerify.middleware");
const { AddressModel } = require("../models/address.model");
const router = express.Router();

router
  .route(`/`)
  .get(authVerify, async (req, res) => {
    const { user } = req;
    try {
      const savedAddresses = await AddressModel.find({
        user: user._id,
      }).populate(`user`, `-password`);
      if (savedAddresses) {
        res.json({
          success: true,
          message: `addresses fetched successfully`,
          addresses: savedAddresses,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `addresses not found`,
        });
      }
    } catch (error) {
      console.error(`somehting went wrong `, error);
      res.status(500).json({
        success: false,
        message: `something went wrong while fethcing the address`,
        errorMessage: error.message,
      });
    }
  })
  .post(authVerify, async (req, res) => {
    const {
      user,
      body: { address },
    } = req;

    try {
      address.user = user._id;
      const savedAddress = await new AddressModel(address).save();
      if (savedAddress) {
        res.status(201).json({
          success: true,
          message: `Address added successfully`,
          address: await savedAddress.populate(`user`, `-password`),
        });
      } else {
        res.status(400).json({
          success: false,
          message: `Invalid Syntax`,
        });
      }
    } catch (error) {
      console.error(`somehting went wrong `, error);
      res.status(500).json({
        success: false,
        message: `something went wrong while adding the address`,
        errorMessage: error.message,
      });
    }
  });
router
  .route(`/:addressId`)
  .post(authVerify, async (req, res) => {
    const {
      user,
      body: { address },
      params: { addressId },
    } = req;

    if (!address) {
      res.status(400).json({
        success: false,
        message: `Invalid Syntax`,
      });
      return;
    }
    try {
      const updatedAddress = await AddressModel.findOneAndUpdate(
        {
          _id: addressId,
          user: user._id,
        },
        {
          ...address,
        },
        {
          new: true,
        }
      ).populate(`user`, `-password`);

      if (updatedAddress) {
        res.status(201).json({
          success: true,
          message: `address updated successfully`,
          address: updatedAddress,
        });
        return;
      }
      res.status(404).json({
        success: false,
        message: `address with given user not found`,
      });
    } catch (error) {
      console.error(`somehting went wrong while updating the address `, error);
      res.status(500).json({
        success: false,
        message: `somehting went wrong while updating the address `,
        errorMessage: error.message,
      });
    }
  })
  .delete(authVerify, async (req, res) => {
    const {
      params: { addressId },
    } = req;
    try {
      const deletedAddress = await AddressModel.findOneAndDelete({
        _id: addressId,
      });
      if (deletedAddress) {
        res.status(200).json({
          success: true,
          message: `address deleted successfully`,
          address: deletedAddress
        });
        return;
      }

      res.status(404).json({
        success: false,
        message: `address not found`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `something went wrong while deleting address`,
        errorMessage: error.message,
      });
    }
  });
module.exports = { router };

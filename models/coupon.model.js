const mongoose = require(`mongoose`);
const { Schema } = mongoose;

const CouponSchema = new Schema({
  coupon: {
    type: String,
    enum: [`AMPLIFY_70`, `AMPLIFY_50`, `AMPLIFY_25`],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: `User`,
  },
  isApplied: {
    type: Boolean,
    default: false,
  },
});

const CouponModel = new mongoose.model(`coupon`, CouponSchema);

module.exports = { CouponModel };

const mongoose = require(`mongoose`);
const { Schema } = mongoose;

const AddressSchema = new Schema({
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  state: {
    type: String,
  },
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: `User`,
  },
});

const AddressModel = new mongoose.model(`address`, AddressSchema);
module.exports = { AddressModel };

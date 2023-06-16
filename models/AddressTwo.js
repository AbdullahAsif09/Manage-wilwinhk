const mongoose = require("mongoose");
const addressTwoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const addressTwo = mongoose.model("addresstwo", addressTwoSchema);
module.exports = addressTwoSchema;

const Address = require("../models/AddressTwo");
require("dotenv").config();

const getAddressTwo = async (req, res) => {
  try {
    // Check if the company information already exists
    const existingAddress = await Address.find({});
    console.log(existingAddress);
    if (existingAddress.length !== 0) {
      res.json(existingAddress);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAddressTwo };

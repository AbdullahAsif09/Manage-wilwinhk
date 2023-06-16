const Address = require("../models/AddressTwo");
require("dotenv").config();

const addAddressTwo = async (req, res) => {
  try {
    // Check if the company information already exists
    const existingAddress = await Address.find({});
    if (existingAddress.length !== 0) {
    //   console.log(existingAddress);
      await Address.deleteMany({});
    }
    // Create a new company document
    const newAddress = new Address({
      title: req.body.title,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      location: req.body.location,
    });

    await newAddress.save();
    res.json({ newAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addAddressTwo };

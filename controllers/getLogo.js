const Logo = require("../models/Logo");

const getLogo = async (req, res) => {
  try {
    let logo = await Logo.find({});
    res.status(200).send({ logo });
  } catch (error) {
    res.send({ erreor: error.message });
  }
};
module.exports = { getLogo };

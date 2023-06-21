const User = require("../models/User");
const JWT = require("jsonwebtoken");

const verifyMail = async (req, res) => {
  try {
    const authToken = req.query.token; // incripted token
    const decode = JWT.verify(authToken, process.env.JWT_KEY); // decrypt token
    const id = decode.user.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    if (user.is_verified) {
      res.status(400).send({ message: "Email already verified..." });
      return;
    }
    user.is_verified = 1;
    await user.save();
    res.status(200).send({ message: "Email verified successfully..." });
  } catch (error) {
    console.log("error=", error.message);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { verifyMail };

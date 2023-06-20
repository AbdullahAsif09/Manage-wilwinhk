const User = require("../models/User");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const customErrors = errors
      .array()
      .map(({ msg, param }) => ({ msg, param }));
    return res.status(400).json({ errors: customErrors });
  }
  const decodedToken = JWT.decode(token, { complete: true });
  if (!decodedToken || Date.now() / 1000 > decodedToken.payload.exp) {
    return res.status(400).json({ message: "Token expired" });
  }
  try {
    JWT.verify(token, process.env.JWT_KEY);
    const { _id } = decodedToken.payload.user;
    // change password in database User model
    await User.findByIdAndUpdate(_id, {
      password: password,
      confirmPassword: confirmPassword,
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { resetPassword };

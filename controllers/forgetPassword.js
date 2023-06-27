const User = require("../models/User");
const JWT = require("jsonwebtoken");
const resetPasswordMail = require("../mails/resetPasswordMail");

const forgetPassword = async (req, res) => {
  try { 
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.is_verified) {
      return res.status(400).json({ message: "Email not verified" });
    }
    const token = JWT.sign({ user: user }, process.env.JWT_KEY, {
      expiresIn: "20m",
    });
    const link = `${process.env.REACT_APP_BASE_URL}/resetpassword?token=${token}`;
    await resetPasswordMail(user, link);
    res.status(200).json({ message: "Reset password link sent to your email" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { forgetPassword };

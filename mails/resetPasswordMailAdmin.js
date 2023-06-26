const nodeMailer = require("nodemailer");
require("dotenv").config();

const resetPasswordMail = async (user, link) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password",
      html: `<p>Hi <b>${user.name}</b>, I guess you have forgotten your password. Please follow this link to <a href = ${link}> <b> reset your password</b></a></p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};

module.exports = resetPasswordMail;

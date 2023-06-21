const nodeMailer = require('nodemailer')
require('dotenv').config()


const adminMailVerification = async (name, email, authToken) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOtions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your Email",
      html: `<p>Dear WilwinHK Staff,

We are currently conducting an important email verification process for all administrative staff members at WilwinHK. Your immediate attention is required to ensure the integrity and security of our communication systems.

To proceed with the verification, please follow these steps:

Visit the WilwinHK email verification portal: <a href = "http://3.7.46.114:8000/admin/verify/${authToken}"> verify your email </a>

Completing this verification process promptly is crucial to maintaining the reliability and safety of our email network.

If you encounter any issues or have questions, please contact our IT support team at [Insert contact details].

Thank you for your immediate attention and cooperation.

Best regards,

Wilwinhk</p>`,
      //   html: `<p>Hi ${name}, Hope you are doing well. Please follow this link to <a href = "http://3.7.46.114:8000/admin/verify/${authToken}"> verify your email </a></p>`,
    };

    transporter.sendMail(mailOtions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email has been sent...", info.response);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = adminMailVerification;
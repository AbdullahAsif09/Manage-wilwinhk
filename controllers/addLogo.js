const Logo = require("../models/Logo");
const { getDataUri } = require("../data/productData");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
require("dotenv").config();

const addLogo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ error: errors.array() });
    }
    let findLogo = await Logo.find({})
    if (findLogo) {
        await Logo.deleteMany({})
    }    
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
    });

    const { images } = req.files;
    let imagesArray;

    if (images) {
      const imgUrl = await Promise.all(
        images.map((image) => getDataUri(image))
      );

      const uploadImages = await Promise.all(
        imgUrl.map((imageUri) =>
          cloudinary.v2.uploader.upload(imageUri.content)
        )
      );

      imagesArray = uploadImages.map((upload) => ({
        public_id: upload.public_id,
        url: upload.secure_url,
      }));
    }

    const logo = new Logo({
      images: imagesArray,
    });

    await logo.save();

    res.send({ message: "Your logo added successfully", logo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLogo,
};

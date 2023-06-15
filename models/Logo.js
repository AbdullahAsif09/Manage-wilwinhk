const mongoose = require("mongoose");
const { Schema } = mongoose;
const logoSchema = Schema({
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});
const Logo = new mongoose.model("logo", logoSchema);
module.exports = Logo;

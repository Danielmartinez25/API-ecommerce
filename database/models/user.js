const mongoose = require("mongoose");
const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "Name is required",
    },
    surname: {
      type: String,
      trim: true,
      require: "Surname is required",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      default: 0,
    },
    rol: {
      type: Number,
      default: 0,
      require: "Rol is required",
    },
    image: {
      secure_url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", productSchema);

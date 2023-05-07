const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { default: isEmail } = require("validator/lib/isEmail");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email required"],
      validate: { validator: isEmail, message: "Invalid email." },
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password required"],
      unique : true
    },
    token: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      default: 0,
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
});
module.exports = mongoose.model("User",userSchema);

const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name is required"],
    },
    description: {
      type: String,
      trim: true,
      require: [true, "Description is required"],
    },
    price: {
      type: Number,
      default: 0,
      require: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0,
      require: [true, "Discount is required"],
    },
    category: {
      type: String,
      require: [true, "Category is required"],
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
module.exports = mongoose.model('Product',productSchema)

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
    color: {
      type: String,
      trim: true,
      require: [true, "Description is required"],
    },
    price: {
      type: Number,
      default: 0,
      require: [true, "Price is required"],
    },
    dues: {
      type: Number,
      min: 0,
      max: 6,
    },
    discount: {
      type: Number,
      default: 0,
      require: [true, "Discount is required"],
    },
    image: {
      secure_url: String,
      public_id: String,
    },
    model_id: { type: Schema.Types.ObjectId, ref: "Model" },
    comment_id: { type: Schema.Types.ObjectId, ref: "Comment" },
    characteristic_id: { type: Schema.Types.ObjectId, ref: "Characteristic" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Product',productSchema)

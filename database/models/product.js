const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    processor: {
      type: String,
      trim: true,
      require: [true, "Processor is required"],
    },
    storage: {
      type: Number,
      require: [true, "Storage is required"],
    },
    camera: {
      type: Number,
      default: 0,
      require: [true, "Camera is required"],
    },
    screenSize: {
      type: Number,
      default: 0,
      require: [true, "ScreenSize is required"],
    },
    image: {
      secure_url: String,
      public_id: String,
    },
    model: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', productSchema)

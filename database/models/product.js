const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      default: 0,
      require: true,
    },
    discount : {
        type : Number,
        default : 0
    },
    category : {
        type : String,
        require : true
    },
    image: {
      secure_url: String,
      public_id: String
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Product',productSchema)

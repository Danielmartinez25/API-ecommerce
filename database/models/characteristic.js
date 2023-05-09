const mongoose = require('mongoose')
const characteristicSchema = new mongoose.Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product" },
  processor: {
    type: String,
    required: [true, "Processor is required"],
    trim: true,
  },
  storage: {
    type: String,
    required: [true, "Storage is required"],
    trim: true,
  },
  camera: {
    frontal: { type: Number },
    rear: { type: Number }
  },
  screenSize : {
    type : Number
  }
});
module.exports = mongoose.model("Characteristic",characteristicSchema);
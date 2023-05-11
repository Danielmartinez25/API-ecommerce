const mongoose = require('mongoose')
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
});

module.exports = mongoose.model('Model',modelSchema)
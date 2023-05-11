const mongoose = require('mongoose')
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
});

module.exports = mongoose.model('Model',modelSchema)
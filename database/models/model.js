const mongoose = require('mongoose')
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  }
});

module.exports = mongoose.model('Model',modelSchema)
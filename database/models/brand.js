const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = mongoose.model('Brand',brandSchema)
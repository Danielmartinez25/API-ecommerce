const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    product_id : { type : mongoose.Schema.Types.ObjectId, ref : 'Product'},
    user_id : {type :Schema.Types.ObjectId, ref : 'User'},
    comment : {type : String,require: [true,'Comment is required'], trim : true},
    date : {type : Date, default : Date.now()}
})
module.exports = mongoose.model('Comment',commentSchema)
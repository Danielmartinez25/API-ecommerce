const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    product : { type : mongoose.Schema.Types.ObjectId, ref : 'Product'},
    user : {type :mongoose.Schema.Types.ObjectId, ref : 'User'},
    comment : {type : String,require: [true,'Comment is required'], trim : true},
    date : {type : Date, default : Date.now()}
})
module.exports = mongoose.model('Comment',commentSchema)
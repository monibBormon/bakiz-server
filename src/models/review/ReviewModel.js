const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail:{type:String},
    productId:{type:mongoose.Schema.Types.ObjectId},
    userName:{type:String},
    reviewText:{type:String},
    rating:{type:Number},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false})

const ReviewModel = mongoose.model('reviews',DataSchema);

module.exports = ReviewModel;
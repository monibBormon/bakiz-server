const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail: {type:String},
    categoryId: {type: mongoose.Schema.Types.ObjectId},
    brandId: {type: mongoose.Schema.Types.ObjectId},
    name:{type:String}, 
    unit: {type:Number}, 
    price: {type:Number}, 
    stock:{type:Number},
    images:[Object],
    details:{type:String}, 
    createdDate:{type:Date,default: Date.now()}, 
},{versionKey:false})

const ProductsModel = mongoose.model("products",DataSchema)

module.exports = ProductsModel;
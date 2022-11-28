const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail: {type:String},
    name: {type:String,unique:true},
    createdDate: {type:Date,default: Date.now()},
},{versionKey:false})

const BrandModel = mongoose.model("brands",DataSchema);

module.exports = BrandModel; 
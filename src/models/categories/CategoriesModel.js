const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail: {type:String},
    name: {type:String,unique:true},
    createDate: {type:Date,default: Date.now()}
},{versionKey: false});

const CategoriesModel = mongoose.model("categories",DataSchema);
module.exports = CategoriesModel;
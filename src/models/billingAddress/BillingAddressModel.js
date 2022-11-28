const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail:{type:String},
    userId:{type: mongoose.Schema.Types.ObjectId},
    address:{type:String,required:true},
    city:{type:String},
    country:{type:String},
    createdDate: {type:Date,default: Date.now()}
},{versionKey:false})

const BillingAddressModel = mongoose.model("billingAddress",DataSchema)

module.exports = BillingAddressModel;
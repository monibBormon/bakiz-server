const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    email: {type:String,unique: true},
    firstName: {type:String},
    lastName: {type:String},
    mobile: {type:String},
    password: {type:String},
    photo: {type:String,default:"https://i.ibb.co/kHWCJ4z/avator.jpg"},
    role:{type:String,enum:['user','admin'],default:"user"},
    createdDate :{type:Date, default: Date.now()}
},{versionKey:false})

const UserModel = mongoose.model("users",DataSchema)
module.exports = UserModel
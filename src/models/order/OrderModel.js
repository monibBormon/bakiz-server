const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userEmail: {type:String},
    products:[
        {
            _id:{type:mongoose.Schema.Types.ObjectId},
            name:{type:String},
            price:{type:Number},
            quantity:{type:Number},
            images:{type:Array}
        }
    ],
    total_amount: {type:Number},
    tran_id:{type:String},
    payment_status:{type:String},
    delivery_status:{type:String,default:"pending"},
    cus_name:{type:String},
    cus_email:{type:String},
    val_id:{type:String},
    shipping:{type:Object},
    cus_phone:{type:String},
    createdDate: {type:Date,default: Date.now()},
},{versionKey:false})

const OrderModel = mongoose.model("orders",DataSchema);

module.exports = OrderModel; 
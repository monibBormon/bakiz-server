
const dataModel = require('../../models/billingAddress/BillingAddressModel');
const createService = require('../../services/common/createService');
const dropdownService = require('../../services/common/dropdownService');
const listOneJoinService = require('../../services/common/listOneJoinService');
const updateService = require('../../services/common/updateService');



exports.createBillingAddress = async(req,res)=>{
    let result = await createService(req,dataModel)
    res.status(200).json(result)
} 

exports.updateBillingAddress = async(req,res)=>{
    let result = await updateService(req,dataModel)
    res.status(200).json(result)
}

exports.dropdownBillingAddress = async(req,res)=>{
    let projection = {_id:1,address:1,city:1,country:1,userId:1}
    let result = await dropdownService(req,dataModel,projection)
    res.status(200).json(result)
}

exports.getUserWithBilling= async(req,res)=>{
    let joinStage1 = {$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"user"}}
    // let projection ={
    //     $project:{
    //         address:1
    //     }
    // }
    let result = await listOneJoinService(req,dataModel,joinStage1);
    res.status(200).json(result);
}
const createService = require("../../services/common/createService");
const dataModel = require('../../models/review/ReviewModel');
const listOneJoinService = require("../../services/common/listOneJoinService");

exports.createReview= async(req,res)=>{
    let result = await createService(req,dataModel);
    res.status(200).json(result);
}

// exports.getProductsReview=async(req,res)=>{
//     let joinStage1 = {$lookup:{from:"products",localField:"productId",foreignField:"_id",as:"review"}}
//     let result = await listOneJoinService(req,dataModel,joinStage1);
//     res.status(200).json(result);
// }
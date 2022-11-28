const dataModel = require('../../models/products/ProductsModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listTwoJoinService = require('../../services/common/listTwoJoinService');
const deleteService = require('../../services/common/deleteService');
const DetailsByIdTwoService = require('../../services/common/detailsByIdTwoJoinService');
const filterListService = require('../../services/common/filterListService');
const filterProducts = require('../../services/common/filterProducts');
const listThreeJoinService = require('../../services/common/listThreeJoinService');
const cloudinary = require('../../utility/cloudinary');

exports.createProducts = async(req,res)=>{
    try {
        let filesArray =[];
        req.files.forEach(element=>{
            const file={
                fileName:element.originalname,
                filePath:`http://bakiz-server.monibbormon.com/${element.path}`,
                fileType:element.mimetype,
                fileSize: fileSizeFormatter(element.size,2)
            }
            filesArray.push(file)
        })
        // console.log(imagesBuffer);
        let body={
            ...req.body,
            images: filesArray
        }
        let result = await dataModel.create(body)
        res.status(200).json({status:"success",data:result})
    } catch (error) {
        console.log("err");
        res.status(200).json({status:"fail",data:error.toString()})
    }
}
exports.singleFileUpload= async(req,res,next)=>{
    try {
        const file = req.file;
        console.log(file);
        res.status(201).send("File upload success")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const fileSizeFormatter=(bytes,decimal)=>{
    if(bytes===0){
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
    const index = Math.floor(Math.log(bytes)/Math.log(1000))
    return parseFloat((bytes/Math.pow(1000,index)).toFixed(dm))+' '+sizes[index]
}
exports.updateProducts = async(req,res)=>{
    let result = await updateService(req,dataModel)
    res.status(200).json(result)
}


exports.productsList = async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{name: searchRgx},{unit:searchRgx},{details:searchRgx},{"brand.name":searchRgx},{"category.name":searchRgx}]
    // let categoryRgx = {"$regex":req.params.category,"$options":"i"}
    // let categoryArray = [{categoryId: categoryRgx}]
    let joinStage1 = {$lookup: {from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}}
    let joinStage2 = {$lookup: {from:"brands",localField:"brandId",foreignField:"_id",as:"brand"}}
    let joinStage3 = {$lookup: {from:"reviews",localField:"_id",foreignField:"productId",as:"reviews"}}
    let result = await listThreeJoinService(req,dataModel,searchArray,joinStage1,joinStage2,joinStage3)
    res.status(200).json(result)
}
exports.productFilterByCategory=async(req,res)=>{
    const filterRgx= {"$regex":req.params.category,"$options":"i"}
    let filterArray=[{"category.name":filterRgx}]
    let joinStage1 = {$lookup: {from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}}
    let joinStage2 = {$lookup: {from:"brands",localField:"brandId",foreignField:"_id",as:"brand"}}
    let result = await filterListService(req,dataModel,filterArray,joinStage1,joinStage2)
    res.status(200).json(result)
}

exports.productFilterByBrand=async(req,res)=>{
    let filterBrandRgx= {"$regex":req.params.brand,"$options":"i"}
    let filterArray=[{"brand.name":filterBrandRgx}]
    let joinStage1 = {$lookup: {from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}}
    let joinStage2 = {$lookup: {from:"brands",localField:"brandId",foreignField:"_id",as:"brand"}}
    let result = await filterListService(req,dataModel,filterArray,joinStage1,joinStage2)
    res.status(200).json(result)
}
exports.getProducts=async(req,res)=>{
    let searchRgx = {"$regex":`${req.query.search}`,"$options":"i"};
    let searchArray = [{name: searchRgx},{unit:searchRgx},{details:searchRgx},{"brand.name":searchRgx},{"category.name":searchRgx}]
    let categoryRgx = {"$regex":`${req.query.category}`,"$options":"i"};
    let categoryArray = [{"category.name":categoryRgx}]
    let joinStage1 = {$lookup: {from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}}
    let joinStage2 = {$lookup: {from:"brands",localField:"brandId",foreignField:"_id",as:"brand"}}
    const result = await filterProducts(req,dataModel,searchArray,categoryArray,joinStage1,joinStage2)
    res.status(200).json(result);
}

exports.productDetailsById = async(req,res)=>{
    let joinStage1 = {$lookup: {from:"categories",localField:"categoryId",foreignField:"_id",as:"category"}}
    let joinStage2 = {$lookup: {from:"brands",localField:"brandId",foreignField:"_id",as:"brand"}}
    let joinStage3 = {$lookup: {from:"reviews",localField:"_id",foreignField:"productId",as:"reviews"}}
    const result = await DetailsByIdTwoService(req,dataModel,joinStage1,joinStage2,joinStage3);
    res.status(200).json(result)
}

exports.productsDelete = async(req,res)=>{
    let result = await deleteService(req,dataModel)
    res.status(200).json(result);


}
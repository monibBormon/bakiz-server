const dataModel = require('../../models/brands/BrandModel');
const ProductModel = require('../../models/products/ProductsModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');
const { default: mongoose } = require('mongoose');
const checkAssociateService = require('../../services/common/checkAssociateService');
const deleteService = require('../../services/common/deleteService');
const DetailsByIdService = require('../../services/common/detailsByIdService');


exports.createBrand = async(req,res)=>{
    let result = await createService(req,dataModel)
    res.status(200).json(result)
}
exports.updateBrand = async(req,res)=>{
    let result = await updateService(req,dataModel)
    res.status(200).json(result)
}

exports.brandList = async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{name: searchRgx}]
    let result = await listService(req,dataModel,searchArray)
    res.status(200).json(result)
}
exports.dropdownBrand = async(req,res)=>{
    let result = await dropdownService(req,dataModel,{_id:1,name:1})
    res.status(200).json(result)
}

exports.brandDetailsById = async(req,res)=>{
    const result = await DetailsByIdService(req,dataModel);
    res.status(200).json(result)
}

exports.brandDelete = async(req,res)=>{
    const deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;

    let checkAssociate = await checkAssociateService({brandId:objectId(deleteId)},ProductModel)

    if(checkAssociate){
        res.status(200).json({status:"associate",data:"Associate with Product"})
    }else{
        let result = await deleteService(req,dataModel)
        res.status(200).json(result);
    }

}
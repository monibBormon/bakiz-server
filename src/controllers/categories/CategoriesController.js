const dataModel = require('../../models/categories/CategoriesModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');
const checkAssociateService = require('../../services/common/checkAssociateService');
const deleteService = require('../../services/common/deleteService');
const ProductsModel = require('../../models/products/ProductsModel');
const { default: mongoose } = require('mongoose');
const DetailsByIdService = require('../../services/common/detailsByIdService');


exports.createCategories = async(req,res)=>{
    let result = await createService(req,dataModel)
    res.status(200).json(result)
}
exports.updateCategories = async(req,res)=>{
    let result = await updateService(req,dataModel)
    res.status(200).json(result)
}

exports.categoriesList = async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{name: searchRgx}]
    let result = await listService(req,dataModel,searchArray)
    res.status(200).json(result)
}
exports.dropdownCategories = async(req,res)=>{
    let result = await dropdownService(req,dataModel,{_id:1,name:1})
    res.status(200).json(result)
}

exports.categoryDetailsById = async(req,res)=>{
    const result = await DetailsByIdService(req,dataModel);
    res.status(200).json(result)
}

exports.categoriesDelete = async(req,res)=>{
    const deleteId = req.params.id;
    const objectId = mongoose.Types.ObjectId;

    let checkAssociate = await checkAssociateService({categoryId:objectId(deleteId)},ProductsModel)

    if(checkAssociate){
        res.status(200).json({status:"associate",data:"Associate with Product"})
    }else{
        let result = await deleteService(req,dataModel)
        res.status(200).json(result);
    }

}
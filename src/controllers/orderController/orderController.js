const dataModel = require('../../models/order/OrderModel');
const deleteService = require('../../services/common/deleteService');
const DetailsByIdService = require('../../services/common/detailsByIdService');
const listService = require('../../services/common/listService');
const updateService = require('../../services/common/updateService');

exports.successPayment=async(req,res)=>{
    const order = await dataModel.updateOne({tran_id:req.body.tran_id},{
        $set:{
            val_id:req.body.val_id,
            payment_status:"success"
        }
    })
    res.redirect(`https://bakiz-monib.netlify.app/success`)
    // res.redirect(`http://localhost:3001/success`)
}
exports.cancelPayment=async(req,res)=>{
    const order = await dataModel.deleteOne({tran_id:req.body.tran_id})
    res.redirect(`https://bakiz-monib.netlify.app/cart`)
}
exports.failPayment=async(req,res)=>{
    const order = await dataModel.deleteOne({tran_id:req.body.tran_id})
    res.redirect(`https://bakiz-monib.netlify.app/cart`)
}
exports.falseReturn=async(req,res)=>{
    if(res === false){
        const order = await dataModel.deleteOne({tran_id:req.body.tran_id})
        res.redirect(`https://bakiz-monib.netlify.app/false`)
    }
}
exports.OrderDetails= async(req,res)=>{
    const userEmail = req.headers['email'];
    let data = await dataModel.aggregate([
        {$match:{userEmail}}
    ])
    res.status(200).json({status:"success",data:data})
}

exports.orderDetailsById= async(req,res)=>{
    const result = await DetailsByIdService(req,dataModel);
    res.status(200).json(result)
}

exports.ordersList = async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{name: searchRgx},{unit:searchRgx},{details:searchRgx},{"brand.name":searchRgx},{"category.name":searchRgx}]
    let result = await listService(req,dataModel,searchArray)
    res.status(200).json(result)
}

exports.orderChangeStatus = async(req,res)=>{
    let result = await updateService(req,dataModel)
    res.status(200).json(result)
}

exports.deleteOrder = async(req,res)=>{
    let result = await deleteService(req,dataModel)
    res.status(200).json(result);
}
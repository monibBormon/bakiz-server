const dataModel = require('../../models/users/UserModel');
const OTPSModel = require('../../models/users/OTPSModel');
const userCreateService = require('../../services/user/userCreateService');
const userLoginService = require('../../services/user/userLoginService');
const userUpdateService = require('../../services/user/userUpdateService');
const userDetailsService = require('../../services/user/userDetailsService');
const userEmailService = require('../../services/user/userVerifyEmailService');
const userOtpService = require('../../services/user/userVerifyOtpService');
const userResetPasswordService = require('../../services/user/userResetPassService');
const userListService = require('../../services/user/userListService');
const dropdownService = require('../../services/common/dropdownService');
const adminUserListService = require('../../services/user/adminUserListService');
// const listOneJoinService = require('../../services/common/listOneJoinService');


/**
 * @desc Register User
 * @access public
 * @route /api/v1/registration
 * @method POST
 */
exports.registration = async(req,res)=>{
    let result = await userCreateService(req,dataModel)
    res.status(200).json(result)
}
/**
 * @desc Login User
 * @access public
 * @route /api/v1//login
 * @method POST
 */
exports.login = async(req,res)=>{
    let result = await userLoginService(req,dataModel)
    res.status(200).json(result)
}
exports.UserList= async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{email: searchRgx},{fistName:searchRgx},{lastName:searchRgx}]
    let result = await userListService(req,dataModel,searchArray)
    res.status(200).json(result)
}
exports.adminUserList=async(req,res)=>{
    let searchRgx = {"$regex":req.params.search,"$options":"i"}
    let searchArray = [{email: searchRgx},{fistName:searchRgx},{lastName:searchRgx}]
    let result = await adminUserListService(req,dataModel,searchArray)
    res.status(200).json(result)
}
exports.dropdownUser=async(req,res)=>{
    let result = await dropdownService(req,dataModel,{_id:1,email:1})
    res.status(200).json(result)
}
exports.makeAdmin = async(req,res)=>{
    let id = req.params.id;
    let email= req.headers['email'];
    let body ={
        role:"admin"
    }
    console.log(id);
    let result = await dataModel.updateOne({_id:id,email:email},body);
    res.status(200).json({status:"success",data:result});
}
exports.profileUpdate = async(req,res)=>{
    let result = await userUpdateService(req,dataModel)
    res.status(200).json(result)
}
exports.profileDetails = async(req,res)=>{
    let result = await userDetailsService(req,dataModel)
    res.status(200).json(result)
}
exports.recoverEmailVerify = async(req,res)=>{
    let result = await userEmailService(req,dataModel)
    res.status(200).json(result)
}
exports.recoverOtpVerify = async(req,res)=>{
    let result = await userOtpService(req,OTPSModel)
    res.status(200).json(result)
}
exports.recoverResetPassword = async(req,res)=>{
    let result = await userResetPasswordService(req,dataModel)
    res.status(200).json(result)
}
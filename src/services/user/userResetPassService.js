const OTPSModel = require("../../models/users/OTPSModel");

const userResetPassService = async(req,dataModel)=>{
    let email = req.body['email'];
        let otpCode = req.body['otp'];
        let newPass = req.body['password']
        let statusUpdate = 1;
    try {
        
        let otpUsedCount = await OTPSModel.aggregate([{$match:{email:email,otp: otpCode, status:statusUpdate}},{$count:"total"}])

        if(otpUsedCount.length>0){
            let passwordUpdate =  await dataModel.updateOne({email:email},{password:newPass})
            return {status:"success",data:passwordUpdate}
        }else{
            return {status:"fail",data:"Invalid Request"}
        }
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}

module.exports = userResetPassService;
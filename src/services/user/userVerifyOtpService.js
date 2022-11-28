

const userVerifyOtpService = async(req,dataModel)=>{
    try {
        let email = req.params.email;
        let otpCode = req.params.otp;
        let status = 0;
        let statusUpdate = 1;

        let otpCount = await dataModel.aggregate([{$match:{email:email,otp: otpCode, status:status}},{$count:"total"}])

        if(otpCount.length>0){
            let otpUpdate =  await dataModel.updateOne({email:email,otp:otpCode,status:status},{email:email,otp:otpCode,status:statusUpdate})
            return {status:"success",data:otpUpdate}
        }else{
            return {status:"fail",data:"Invalid Otp Code"}
        }
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}

module.exports = userVerifyOtpService;
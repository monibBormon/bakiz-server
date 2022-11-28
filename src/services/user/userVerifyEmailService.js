const OTPSModel = require('../../models/users/OTPSModel');
const sendEmailUtility = require('../../utility/sendEmailUtility')

const userVerifyEmailService= async(req,dataModel)=>{
    
    try{
        let email = req.params.email;
        let otpCode = Math.floor(10000+Math.random()*900000)
        // Query Is Email Exist 
        const userCount = (await dataModel.aggregate([{$match:{email:email}},{$count:"total"}]))

        if(userCount.length>0){
            // Create Otp if user exist
            await OTPSModel.create({email:email,otp:otpCode})
            let sendEmail = await sendEmailUtility(email,"Your Verification Code Is "+otpCode, "Inventory PIN Verification")
            return {status:"success",data:sendEmail}

        }else{
            return {status:"fail",data:"No User Found!"}
        }


    }catch(e){
        return {status:"fail",data:e.toString()}
    }
}


module.exports = userVerifyEmailService;
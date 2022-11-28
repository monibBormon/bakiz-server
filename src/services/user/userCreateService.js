const { CreateError } = require("../../helper/ErrorHandler");

const userCreateService = async(req,dataModel)=>{
    try {
        let body = req.body;
        const isExistsCheck = await dataModel.aggregate([
            {$match:{$or:[{email:body.email},{mobile:body.mobile}]}}
        ])
        if(isExistsCheck && isExistsCheck.length>0){
            throw CreateError("User Already Registered" , 400)
        }

        let data = await dataModel.create(body)
        return {status:"success",data:data}
        
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

module.exports = userCreateService;
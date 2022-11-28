
const userUpdateService = async(req,dataModel) =>{
    try {
        const data = await dataModel.updateOne({email: req.headers['email']},req.body)
        return {status:"success",data:data}
    } catch (error) {
        return {status:"fail",data: error.toString()}
    }

}

module.exports = userUpdateService;
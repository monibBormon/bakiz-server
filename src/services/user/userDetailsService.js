const userDetailsService = async(req,dataModel) =>{
    try {
        const data = await dataModel.aggregate([{$match:{email: req.headers['email']}}])
        return {status:"success",data:data}
    } catch (error) {
        return {status:"fail",data: error.toString()}
    }

}

module.exports = userDetailsService;

const listOneJoinService = async(req,dataModel,joinStage)=>{
    try {
        let email = req.headers['email']
        let data = await dataModel.aggregate([
            {$match: {userEmail:email}},
            joinStage,
            // projection
        ])
        return {status:"success",data:data}
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


module.exports = listOneJoinService;
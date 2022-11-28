
const updateService=async(req,dataModel)=>{
    try {
        let id = req.params.id;
        let body = req.body;
        let data  = await dataModel.updateOne({_id:id},body)
        return {status:"success",data:data}
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

module.exports = updateService;
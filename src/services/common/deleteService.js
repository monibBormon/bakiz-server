const deleteService = async(req,dataModel)=>{
    try {
        let id = req.params.id;
        let userEmail = req.headers['email'];

        let queryObject = {};
        queryObject['_id'] = id;
        queryObject[userEmail] = userEmail;

        let DeleteData = await dataModel.deleteOne(queryObject);

        return {status:"success", data: DeleteData}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

module.exports = deleteService;
const mongoose = require('mongoose');
const DetailsByIdService = async(req,dataModel,joinStage1,joinStage2,joinStage3)=>{
    try {
        const id = req.params.id;
        // const userEmail = req.headers['email'];
        const objectId = mongoose.Types.ObjectId;
        const queryObject = {};
        queryObject['_id'] = objectId(id);
        // queryObject['userEmail'] = userEmail;

        let data = await dataModel.aggregate([
            joinStage1,joinStage2, joinStage3,
            {$match:queryObject}
        ])

        return {status:"success",data}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


module.exports = DetailsByIdService;
const mongoose = require('mongoose');

const createParentChildService = async(req,parentModel,childModel,joinText)=>{
    // create transaction session
    const session = await mongoose.startSession();

    try {
        // transaction start 
        await session.startTransaction()

        // first database process 
        let parentBody = req.body['parent'];
        parentBody.userEmail = req.headers['email'];
        let parentCreation = await parentModel.create([parentBody],{session});

        // second database process
        let childs = req.body['childs']
        await childs.forEach((el)=>{
            el[joinText] = parentCreation[0]['_id']
            el['userEmail'] = req.headers['email']
        })
        let childsCreation = await childModel.insertMany(childs,{session});

        // if successfull 
        await session.commitTransaction();
        session.endSession()

        return {status:"success",parent: parentCreation, childs: childsCreation}
    } catch (error) {
        // rollback transaction if fail 
        await session.abortTransaction();
        session.endSession();
        return {status:"fail",data: error.toString()}
    }


}

module.exports = createParentChildService;
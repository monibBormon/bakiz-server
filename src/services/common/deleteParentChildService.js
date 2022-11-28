const mongoose = require('mongoose');

const deleteParentChildService = async(req,parentModel,childModel,joinProperty)=>{
    const session = await mongoose.startSession();

    try {
        // begin transaction 
        await session.startTransaction();

        let deleteId = req.params.id;
        let userEmail = req.headers['email'];

        let childQueryObject = {};
        childQueryObject[joinProperty] = deleteId;
        childQueryObject[userEmail] = userEmail;

        let parentQueryObject = {};
        parentQueryObject['_id'] = deleteId;
        parentQueryObject[userEmail] = userEmail;

        //first Process
        let childDelete = await childModel.remove(childQueryObject).session(session);
        //second process
        let parentDelete = await parentModel.remove(parentQueryObject).session(session);

        // commit transaction 
        await session.commitTransaction();
        session.endSession();

        return {status:"success",parent: parentDelete,child:childDelete}


    } catch (error) {
        // rollback transaction 
        await session.abortTransaction();
        session.endSession();
        return {status:"fail",data:error.toString()}
        
    }
}

module.exports = deleteParentChildService;
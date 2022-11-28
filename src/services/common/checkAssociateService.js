const checkAssociateService = async(queryObject,associateModel)=>{
    try {
        let data = await associateModel.aggregate([
            {$match: queryObject}
        ])
        return data.length > 0;
    } catch (error) {
        return false;
    }
}

module.exports = checkAssociateService;
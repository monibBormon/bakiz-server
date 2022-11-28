
const adminUserListService = async(req,dataModel,searchArray)=>{
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.search;

        let skipRow = (pageNo - 1) * perPage;
        let data;

        if(searchValue !== '0'){
            let searchQuery = {$or:searchArray}
            data = await dataModel.aggregate([
                {$match: {role:'admin'}},
                {$match: searchQuery},
                {
                    $facet: {
                        Total: [{$count:"count"}],
                        Rows: [{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
        }else{
            data = await dataModel.aggregate([
                {$match: {role:'admin'}},
                {
                    $facet: {
                        Total: [{$count:"count"}],
                        Rows: [{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
        }
        return {status:"success",data:data}
        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


module.exports = adminUserListService;
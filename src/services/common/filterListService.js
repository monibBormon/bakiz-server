
const filterListService = async(req,dataModel,filterArray,joinStage1,joinStage2)=>{
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let value = req.params.filter;

        let skipRow = (pageNo - 1) * perPage;
        let data;

        if(value !== '0'){
            let filterQuery = {$or:filterArray}
            data = await dataModel.aggregate([
                joinStage1,joinStage2,
                {$match: filterQuery},
                {
                    $facet: {
                        Total: [{$count:"count"}],
                        Rows: [{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
        }
        else{
            data = await dataModel.aggregate([
                joinStage1,joinStage2,
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


module.exports = filterListService;
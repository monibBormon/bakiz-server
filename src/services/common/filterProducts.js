const filterProducts = async(req,dataModel,searchArray,categoryArray,joinStage1,joinStage2)=>{
    try {
        let pageNo = Number(req.query.pageNo);
        let perPage = Number(req.query.perPage);
        let searchValue = req.query.search || "0";
        let categoryReq = req.query.category;

        let skipRow = (pageNo - 1) * perPage;
        console.log(categoryReq);
        let data;
        data = await dataModel.aggregate([
            joinStage1,joinStage2,
            {$match: {categoryId: categoryReq}},
            {
                $facet: {
                    Total: [{$count:"count"}],
                    Rows: [{$skip:skipRow},{$limit:perPage}]
                }
            }
        ])

        return {status:"success",data:data}


        
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

module.exports = filterProducts;
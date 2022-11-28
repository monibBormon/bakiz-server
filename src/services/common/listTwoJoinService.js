
const listTwoJoinService = async(req,dataModel,searchArray,joinStage1,joinStage2)=>{
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.search;
        // let category = req.params.category;
        // let email = req.headers['email']
        // console.log(categoryArray);

        let skipRow = (pageNo - 1) * perPage;
        let data;

        if(searchValue !== '0'){
            let searchQuery = {$or:searchArray}
            // let categoryQuery = {$or:categoryArray}
            // console.log(searchQuery);
            data = await dataModel.aggregate([
                // {$match: {userEmail:email}},
                joinStage1,joinStage2,
                {$match: searchQuery},
                // {$match: categoryQuery},
                {
                    $facet: {
                        Total: [{$count:"count"}],
                        Rows: [{$skip:skipRow},{$limit:perPage}]
                    }
                }
            ])
        }
        // else if(category !== "0"){
        //     let categoryQuery = {$or:categoryArray}
        //     console.log(categoryQuery);
        //     data = await dataModel.aggregate([
        //         // {$match: {userEmail:email}},
        //         joinStage1,joinStage2,
        //         {$match: categoryQuery},
        //         {
        //             $facet: {
        //                 Total: [{$count:"count"}],
        //                 Rows: [{$skip:skipRow},{$limit:perPage}]
        //             }
        //         }
        //     ])
        // }
        else{
            data = await dataModel.aggregate([
                // {$match: {userEmail:email}},
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


module.exports = listTwoJoinService;
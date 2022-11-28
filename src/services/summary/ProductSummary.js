const Model = require("../../models/products/ProductsModel");

const ProductSummary = async(req)=>{
    try {
        const userEmail = req.headers['email'];
        let data = await Model.aggregate([
            {$match:{userEmail}},
            {$facet:{
                Total:[{
                    $group:{_id:0,TotalAmount:{$sum:"$price"}}
                }],
                Last30Days:[{
                    $group:{
                        _id:{$dateToString:{format:"%Y-%m-%d",date:"$createDate"}},
                        TotalAmount: {$sum:"$amount"}
                    }},
                    {$sort:{_id:-1}},
                    {$limit:30}
                ]
            }}
        ])

        return {status:"success",data}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}

module.exports = ProductSummary;
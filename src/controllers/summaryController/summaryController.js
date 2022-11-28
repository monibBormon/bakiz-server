

exports.productSummary = async(req,res)=>{
    const result = await pro(req);
    res.status(200).json(result)
}
const jwt = require("jsonwebtoken");
const createToken= async (data) => {
    let Payload={expiresIn:"7d", data:data}
    return await jwt.sign(Payload, 'secretKey12345');
}
module.exports=createToken
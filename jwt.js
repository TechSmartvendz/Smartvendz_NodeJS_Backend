const jwt = require("jsonwebtoken");

const createToken= async()=>{
    const token =await jwt.sign({_id:"ejrerur34484934r43enjnd"},"dsdkfsdksd",{expiresIn:"2 min"});
    console.log(token);

    const userVer= await jwt.verify(token,"dsdkfsdksd");
    console.log(userVer);
}
createToken();

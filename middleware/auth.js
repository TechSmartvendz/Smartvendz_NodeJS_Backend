const User = require("../models/user");
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
   
    if (bearerHeader) {
        console.log("barrer");
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        console.log(bearerToken);
        try {
            const verifyUser = jwt.verify(bearerToken, process.env.SECRET_KEY);
            console.log(verifyUser);
            const user = await User.findOne({ _id:verifyUser._id },{password:0,otp:0,__v:0})
            req.user = user;
            req.tokenid = verifyUser;
            //console.log(`auth ${user}`);
            if(user==null){
                res.status(401).json({"error":"user not found"});
            }else {
           //console.log(req.user);
            next();
            return;}
        }
        catch (error) {
            res.status(401).send(error);
            return;
        }

    } 
    else if(req.cookies){
        try {
             const token = req.cookies.cookie;
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
            console.log(verifyUser);
            const user = await User.findOne({ _id: verifyUser._id })
            req.user = user;
            req.tokenid = verifyUser;
        
            next();
            return;
        }
        catch (error) {
            res.status(401).send(error);
            return;
        }
        

    }
    else{
        res.status(404).json({"status":"session not found"}); 
    }
}




module.exports = auth;
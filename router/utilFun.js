const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret");

module.exports.bodyChecker = function bodyChecker(req,res,next){
    // let body = req.body;
    
    let isPresent = Object.keys(req.body);
    console.log(isPresent.length);
    if(isPresent.length){
        next();
    }else{
        res.send("send details in body")
    }
}
module.exports.protectRoute = function protectRoute(req,res,next){
    try{
        let decreptedToken = jwt.verify(req.cookies.JWT , JWT_SECRET);
        if(decreptedToken){
            next();
        }else{
            res.send("send details in body")
        }
    } catch(err){
        res.status(404).json({
            message:err.message,
        })
    }
    }   
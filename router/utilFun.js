const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../hide/secret");

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
            let userId = decreptedToken.id;
            req.userId =  userId
           console.log(userId)
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

module.exports.isAuthorized =   function isAuthorized(roles){
    return async function (req,res,next){
        let {userId} = req

        try{
            let user = await userModel.findById(userId);
            let userIsAuthorized = roles.includes(user.role);
            if(userIsAuthorized){
                next();
            }else{
                res.status(200).json({
                    message:"User not authorized"
                })
            }
        }
     
        catch(err){
            res.status(404).json({
                message:"Server Error"
            })
        }


    }
}
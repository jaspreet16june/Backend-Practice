const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../hide/secret");
const userModel = require("../model/userModel")
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
module.exports.protectRoute = function protectRoute(req, res, next) {
    try {

        let decreptedToken = jwt.verify(req.cookies.JWT, JWT_SECRET);
        if (decreptedToken) {
            let userId = decreptedToken.id;
            req.userId = userId;
            next();
        } else {
            res.send("kindly login to access this record");
        }

    } catch (err) {
        res.status(404)
            .json({
                message: err.message,
            })
    }
}


// module.exports.isAuthorized =   function isAuthorized(roles){
//     return async function (req,res,next){
//         let {userId} = req

//         try{
//             let user = await userModel.findById(userId);
//             let userIsAuthorized = roles.includes(user.role);
//             if(userIsAuthorized){
//                 next();
//             }else{
//                 res.status(200).json({
//                     message:"User not authorized"
//                 })
//             }
//         }
     
//         catch(err){
//             res.status(404).json({
//                 message:"Server Error"
//             })
//         }


//     }
// }
module.exports.isAuthorized = function (roles) {
    console.log("I will run when the server is started")
    // function call 
    console.log()
    return async function (req, res,next) {
        console.log("Inner function");
        let { userId } = req;
        // id -> user get ,user role,
        try {
            let user = await userModel.findById(userId);
            console.log("role", user)
            let userisAuthorized = roles.includes(user.role);
            if (userisAuthorized) {
                req.user = user;
                next();
            } else {
                res.status(200).json({
                    message: "user not authorized"
                })
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error"
            });
        }
    }

}

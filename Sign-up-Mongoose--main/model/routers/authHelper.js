const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../secret.js');


function protectRoute(req,res,next){
    try{
        if(req.cookie.login){
            console.log(req.cookie);
            // jwt.verify(token, secret);
            let isVerified = jwt.verify(req.cookies.login,JWT_KEY)
            if(isVerified){
                next();
            }else{
                return res.json({
                    message:"not authorised"
                })
            }
        }
        else{
            res.json({
                message:"Operation not allowed"
            })
        }
   }
   catch(err){
        return res.status(500).json({
            message:err.message
        })
   }
}


module.exports = protectRoute;
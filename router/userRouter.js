const express = require('express');

const userRouter = express.Router();


userRouter
         .route("/")
         .get(protectRoute,getUsers)
         .post(bodyChecker,createUser)


 
         function createUser(req,res){
            let body = req.body;
            console.log(body);
        
            content.push(body);
            fs.writeFileSync("./data.json",JSON.stringify(content));
           
            res.status(200).json({
                message:content,
            })
        }
        
        
        function getUsers(req,res){    
            res.status(200).json({
                message: content
            })
        }
        
        function bodyChecker(req,res,next){
            // let body = req.body;
            
            let isPresent = Object.keys(req.body);
            console.log(isPresent.length);
            if(isPresent.length){
                next();
            }else{
                res.send("send details in body")
            }
        }
        
        
        function protectRoute(req,res,next){
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
module.exports = userRouter;
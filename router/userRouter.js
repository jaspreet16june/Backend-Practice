const express = require('express');
const {protectRoute,bodyChecker} = require("./utilFun")
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
  
module.exports = userRouter;
const express = require('express');
const {protectRoute,bodyChecker} = require("./utilFun")
const userRouter = express.Router();
const userModel = require("../userModel")

userRouter
         .route("/")
         .get(protectRoute,getUsers)
         .post(bodyChecker,createUser)
        
        
userRouter 
         .route("/:id")
         .post(bodyChecker,getUser)
         .post(bodyChecker,deleteUser)
         .post(bodyChecker,updateUser)

 //onlu authorized to admin
        async function createUser(req,res){
            try{
                let user = await userModel.create(req.body)
                res.status(202).json({
                    user:user
                })

            }
            catch(err){
                res.status(500).json({
                    message:"server error"
                })
            }
        }
        
        
        async function getUser(req,res){    
         try{
            let {id} = req.params;
           let user =  await userModel.findById(id);
            res.status(202).json({
                message: user
            })
         }
         catch(err){
            res.status(500).json({
                message:"server error"
            })
         }
        }
        async function getUsers(req,res){
            try{
              let user =   await userModel.find();
              res.status(202).json({
                message: user
            })
         }
         catch(err){
            res.status(500).json({
                message:"server error"
            })
         }
        }
        async function deleteUser(req,res){
            try{
                let { id } = req.body
                let user = await userModel.findByIdAndDelete(id);
                res.status(202).json({
                    message:"User Is Deleted"
                })
            }
            catch{
                res.status(500).json({
                    message:"server error"
                })
            }
        }
        async function updateUser(req,res){
            try{
                let {id} = req.params
                let user = await userModel.findById(id);
              
                    for(let key in req.body){
                        user[key] = req.body[key]
                    }
                    await user.save();
                    res.status(202).json({
                        message:"User Is Updated"
                    })
            }
            catch(err){
                res.status(500).json({
                    message:"servererror"
                })
            }
        }
module.exports = userRouter;
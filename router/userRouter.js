const express = require('express');
const {protectRoute,bodyChecker} = require("./utilFun")
const userRouter = express.Router();
const userModel = require("../userModel")

userRouter
         .route("/")
         .get(getUsers)
         .post(bodyChecker,createUser)
        
        
userRouter 
         .route("/:id")
         .get(bodyChecker,getUser)
         .patch(bodyChecker,updateUser)
         .delete(bodyChecker,deleteUser)

 //onlu authorized to admin
        async function createUser(req,res){
            try{
                let user = await userModel.create(req.body)
                res.status(202).json({
                    createdUser :user
                })

            }
            catch(err){
                res.status(500).json({
                    message:"server error"
                })
            }
        }
        
       
        
        // async function getUser(req,res){    
        //  try{
        //     let {id} = req.params;
        //    let user =  await userModel.findById(id);
        //     res.status(202).json({
        //         message: user
        //     })
        //  }
        //  catch(err){
        //     res.status(404).json({
        //         message:err.message
        //     })
        //  }
        // }

        async function getUser(req, res) {
            try {
                let { id } = req.params;
                let user = await userModel.findById(id);
                res.status(200).json({
                    message: user,
                })
        
            } catch (err) {
                res.status(404).json({
                    message: err.message,
                })
            }
        }
        
        async function getUsers(req,res){
            try{
              let user = await userModel.find();
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
                if(req.body.password || req.body.confirmPassword){
                    res.status(200).json({
                        message:"Use forget password instead"
                    })
                }
              

                        for(let key in req.body){
                            user[key] = req.body[key]
                        }
                        await user.save({
                            validateBeforeSave: false
                        });
                        res.status(202).json({
                            message:"User Is Updated"
                        })
                    
            }
            catch(err){
                res.status(500).json({
                    message:"server error"
                })
            }
        }
module.exports = userRouter;
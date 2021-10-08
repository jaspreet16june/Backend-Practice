const express = require('express');
// const cookieParser = require('cookie-parser');
// const protectRoute=require('./authHelper')
const userRouter =express.Router();
const userModel=require('../userModel');


userRouter
        .route('/')
        .get(protectRoute,getUser)
      

userRouter
        .route('/:id')
        .get(getUserById);
                   
async function getUser(req,res){

        try{
            console.log("getUser called");

            let user = await userModel.find();

            if(user){
                return res.json(user);
            }else{
                return res.json({
                    message:"user not found"
                })
            }
        }
        catch(err){
            return res.json({
                message: err.message,
            })
        } 
    }
        
        
        // //post request
        
        // // client-> server 
        
        // //create
        // function createUser(req,res){
        //     user=req.body;
        //     // console.log(req.body);
        //     res.send('data has been added succesfully');
        // }
        // //update
        
        // function updateUser (req,res){
        //     let obj=req.body;
        //     for(let key in obj){
        //         user[key]=obj[key];
        //     }
        //     res.json(user);
        // };
        // //delete 
        
        // function deleteUser(req,res){
        //     user={};
        //     res.json(user);
           
        // }
       
        //middelware function
        function protectRoute(req,res,next){
            try{
                if(req.cookie){
                    if(req.cookie == "1234"){
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
                return res.json({
                    message:err.message
                })
           }
        }

        function getUserById(req,res){
            console.log(req.params);
            res.json(req.params.id);
        }
     
        module.exports=userRouter;
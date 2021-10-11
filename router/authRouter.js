const express = require('express');
const { JWT_SECRET } = require("../hide/secret");
const jwt = require("jsonwebtoken");
const {bodyChecker} = require("./utilFun");
const authRouter = express.Router();
const emailSender = require("../sendEmail");
const userModel = require("../userModel");


authRouter
         .route("/signup")
        //  .get(getUsers)
         .post(bodyChecker,signUpUser)

authRouter
         .route("/login")
         .post(bodyChecker,loginUser)

authRouter
         .route("/forgetPassword")
         .post(forgetPassword);
    

         async function signUpUser(req,res){
            try{
                // let {name,email,password,confirmPassword} = req.body
                // if(password == confirmPassword){
                //     let newUser = {name,email,password,confirmPassword};
                //     content.push(newUser);
        
                //     fs.writeFileSync("data.json",JSON.stringify(content));
                //     res.status(200).json({
                //         createUser:newUser
                //     })
        
                // }else{
                //     res.status(422).send("Data is not Sufficent");
                // }
        
                let newUser = await userModel.create(req.body);
                res.status(200).json({
                    message:"User created successfully",
                    user:newUser,
                })
            }
            catch(err){
                res.status(500).json({
                    message:err.message,
                })
            }
        }
        async function loginUser(req,res){
            try{
                let {email,password} = req.body ;

               let user =await userModel.findOne({email});

               if(user){
                   //password
                   if(user.password == password){
                       let token = jwt.sign({id:user["_id"]},JWT_SECRET,{httpOnly :true})
                       res.cookie("jwt",token)

                       res.status(200).json({
                           message:"User Logged In",
                       })
                    }
                    else{
                        res.status(404).json({
                            message:"User with this email is not found Kindly Signup"
                        })
                    }
               }else{
                   res.status(404).json({
                       message:"User Not Found"
                   })
               }
            }
                catch(err){
                    res.status(400).json({
                        message:err.message,
                    })
                }
            }

        async function forgetPassword(req,res){
            try{

                let {email} = req.body;

                let user = await userModel.findOne({email});

                if(user){
                    let token = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                    await userModel.updateOne({email},{token});
                    let newUser = await userModel.findOne({email});

                    await emailSender(token, user.email);

                    res.status(200).json({
                        message:"user token send to your email",
                        user:newUser,
                        token
                    })
                }else{
                        res.status(404).json({
                            message:"Kindly write correct email"
                        })
                }
            }
            catch(err){
                res.status(404).json({
                    message:err.message
                })
            }
        }
        async function resetPassword(req,res){
            try{

                let {token, password,confirmPasssword} = req.body;
                let user = await userModel.findOne({ token })

                if(user){

                    user.password = password
                    user.confirmPasssword = confirmPasssword
                    user.token = undefined

                    //database m save krna we will use save()
                    
                    await user.save()
                    
                    let newUser = await userModel.findOne({email:user.email})
                     
                    res.status(200).json({
                        message:"user token sent to your mail",
                        user: newUser
                    })
                }else{
                    res.status(404).json({
                        message:"tkoken is incorrect"
                    })
                }
                    
            }
            catch(err){
                    res.status(500).json({
                        message:err.message
                    })
            }
        }
module.exports = authRouter;
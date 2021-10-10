const express = require('express');

const {bodyChecker} = require("./utilFun");
const authRouter = express.Router();

const userModel = require("../userModel");


authRouter
         .route("/signup")
        //  .get(getUsers)
         .post(bodyChecker,signUpUser)

authRouter
         .route("/login")
         .post(bodyChecker,loginUser)
    

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
        function loginUser(req,res){
            try{
        
                let {email,password} = req.body;
                console.log(email);
                let obj =  content.find((obj)=>{
                    console.log(email)
                    return obj.email == email;
                })
                if(!obj){
                    return res.status(404).json({
                        message:"User not found"
                    })
                }
                if(password == obj.password){
                    let token = jwt.sign({email:obj.email},JWT_SECRET);
                    res.cookie("JWT",token)
                    res.status(200).send("user logged-in")
                }
                
                else {
                    res
                        .status(422)
                        .send(" kindly enter correct email and password");
                }
            }
                catch(err){
                    res.status(400).json({
                        message:err.message,
                    })
                }
            }
module.exports = authRouter;
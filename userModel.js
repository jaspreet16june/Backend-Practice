const mongoose = require("mongoose");
const {PASSWORD} = require("./hide/secret.js");
const db_link = `mongodb+srv://Jaspreet_Kaur:${PASSWORD}@cluster0.81jou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const validator = require("email-validator");

mongoose.connect(db_link).then(function(db){
    console.log("db connected")
})
.catch(function(err){
    console.log(err);
})

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email)
        }
    },
    
    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        // required:true,
        min:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin","CE","user"],
        default:"user"
    }
})

userSchema.pre('save',function(next){
    this.confirmPassword = undefined,
    next();
})
let userModel = mongoose.model("userModel",userSchema)
module.exports =userModel;
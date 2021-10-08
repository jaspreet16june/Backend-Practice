const mongoose = require('mongoose');
const {db_link}= require('./secret.js');
const validator = require('email-validator');

mongoose.connect(db_link).then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err)
})

const userSchema  = new mongoose.Schema({


    name:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    createAt:{
        type: Date,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    confirmPassword:{
        type:String,
        required: true,
        validate:function(){
            return this.password == this.confirmPassword;
        },
    }
})


userSchema.pre('save',function(){
    this.confirmPassword = undefined;
})
const userModel = mongoose.model('userModel',userSchema);

// (async function createUser(){
     
//    let user={
//             name : 'Harsimran singh',
//             age:21,
//             email:'harsimranSingh@gmail.com',
//             password:'123abcde',
//             confirmPassword:'123abcde',
//     }

//     let userObj = await userModel.create(user);
//     console.log(userObj);
// })();

module.exports = userModel;
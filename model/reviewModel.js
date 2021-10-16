const mongoose=require("mongoose")
const {PASSWORD} = require("../hide/secret");
const db_link = `mongodb+srv://Jaspreet_Kaur:${PASSWORD}@cluster0.81jou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const validator = require("email-validator");

mongoose.connect(db_link).then(function(db){
    console.log("db connected")
})
.catch(function(err){
    console.log(err);
})

const reviewSchema = mongoose.Schema({

    review:{
        type:String,
        required:[true,"Review can't be empty"]
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,"you must have to give rating"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Review must be belong to user"],
        ref:"userModel"
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Review must be belong to plan"],
        ref:"planModel"
    }
})

const ReviewModel = mongoose.model("reviewModel",reviewSchema);

module.exports = ReviewModel;
const mongoose = require("mongoose");
const {PASSWORD} = require("../hide/secret");
const db_link = `mongodb+srv://Jaspreet_Kaur:${PASSWORD}@cluster0.81jou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const validator = require("email-validator");

mongoose.connect(db_link).then(function(db){
    console.log("db2 connected")
})
.catch(function(err){
    console.log(err)
})
const planSchema = new mongoose.Schema({

    name:{
        type:String,
        unique:[true,"You have to enter unique Plan name"],
        required:[true,"You are required to enter the plan name"],
        maxLength:[4,"You plan name Length must be smaller than or equal to 4"],
    },
    duration:{
        type:Number,
        required:[true,"You need to provide duration"]
    },
    price:{
        type:Number,
        required:[true,"You need to provide price of the plan"]
    },
    discount:{
        type:Number,
        validate:function(){
            return this.discount < this.price;
        },
        message:["Your discount must be less than the actual price"]
    },
    planImage:{
        type:[String]
    }

})

let planModel = mongoose.model("planModel",planSchema);
module.exports = planModel;
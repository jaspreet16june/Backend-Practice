const mongoose = require("mongoose");
const {db_link} = require("../hide/secret");

mongoose.connect(db_link).then(function(db){
    console.log("Db Booking is connected");
}).catch(function(err){

    console.log(err);
})

const bookingSchema =new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    bookedAt:{
        type:Date,
    },
    priceAtThatTime:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","failure","success"],
        required:true,
        default:"pending"
    }
})

const bookingModel = mongoose.model("bookingModel",bookingSchema);
module.exports = bookingModel;
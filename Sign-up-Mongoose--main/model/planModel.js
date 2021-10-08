const mongoose = require('mongoose');

const planSchema =  new mongoose.Schema({

      id:{
          type: Number,
      },
      name:{
          type:String,
          required:true,
      },
      ratings:{
          type:Number,
      },
      price:{
          type:Number,
          required:true,
      },
      delivery:{
          type:Boolean,
      },
      meals:{
          type:Number,
      },
      description:{
          type:String,
      },
}) 

const planModel = mongoose.Model('planModel',planSchema); 
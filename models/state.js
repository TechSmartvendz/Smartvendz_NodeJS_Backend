const mongoose =require("mongoose");
const validator = require("validator");

const state=new mongoose.Schema({
   state:{
        type:String,
        require: true,
        unique:true
    },
    country:{
        type:String,
        require: true,
    },
    superAdmin:{
        type:String,
        require: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}) 

const State= new mongoose.model('State',state);

module.exports=State;

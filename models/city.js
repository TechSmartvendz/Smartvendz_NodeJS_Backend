const mongoose =require("mongoose");
const validator = require("validator");

const city=new mongoose.Schema({
   city:{
        type:String,
        require: true,
        unique:true
    },
    state:{
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

const City= new mongoose.model('City',city);

module.exports=City;

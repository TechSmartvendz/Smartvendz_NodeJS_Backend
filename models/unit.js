const mongoose =require("mongoose");
const validator = require("validator");

const unit=new mongoose.Schema({
   unit:{
        type:String,
        require: true,
        unique:true
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

const Unit= new mongoose.model('Unit',unit);
module.exports=Unit;

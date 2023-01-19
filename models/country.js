const mongoose =require("mongoose");
const validator = require("validator");

const country=new mongoose.Schema({
   country:{
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

const Country= new mongoose.model('Country',country);

module.exports=Country;

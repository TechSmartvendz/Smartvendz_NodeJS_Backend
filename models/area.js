const mongoose =require("mongoose");
const validator = require("validator");

const area=new mongoose.Schema({
    area:{
        type:String,
        require: true,
        unique:true
    },
    city:{
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

const Area= new mongoose.model('Area',area);

module.exports=Area;

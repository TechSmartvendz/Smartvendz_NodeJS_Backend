const mongoose =require("mongoose");
const validator = require("validator");

const refundrequestSchema=new mongoose.Schema({
    
    ename:String,
    phone:String,
    machine:String,
    tdate:Date,
    select:String,
    tamount: String,
    ramount: String,
    transaction_id: String,
    remark: String,
    created_date: {
        type: Date,
        default: Date.now
    }



}) 

// we will create a new collecction

const Refundrequest= new mongoose.model('Refundrequest',refundrequestSchema);

module.exports=Refundrequest;
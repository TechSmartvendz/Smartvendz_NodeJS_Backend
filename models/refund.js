const mongoose =require("mongoose");


const refund=new mongoose.Schema({
 
    mtransactionId:String,
    rsuccess:Boolean,
    rcode:String,
    rmessage:String,
    rmerchantId:String,
    rtransactionId:String,
    rproviderReferenceId:String,
    ramount:Number,
    rpayResponseCode: String,
    rstatus: String,
    created_date: {
        type: Date,
        default: Date.now
    },
   

}) 

// we will create a new collecction

const Refund= new mongoose.model('refund', refund);

module.exports=Refund;

const mongoose =require("mongoose");


const callbacktransaction=new mongoose.Schema({
 
   
    success:Boolean,
    code:String,
    message:String,
    merchantId:String,
    transactionId:String,
    providerReferenceId:String,
    amount:Number,
    paymentState:String,
    payResponseCode: String,
    storeId: String,
    terminalId:String,
    vendstatus:{
        type: String,
        default:"NONE"
    },
    refundstatus:{
        type: String,
        default:"NONE"
    },
    napkinjob:Boolean,
    created_date: {
        type: Date,
        default: Date.now
    },
    jobdone_date: {
        type: Date,
    },

}) 

// we will create a new collecction

const Callbacktransaction= new mongoose.model('callbacktransaction', callbacktransaction);

module.exports=Callbacktransaction;

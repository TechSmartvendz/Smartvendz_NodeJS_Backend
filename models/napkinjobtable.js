const mongoose =require("mongoose");


const napkinjobtable=new mongoose.Schema({
 
   
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
    vendstatus:String,
    created_date: {
        type: Date,
        default: Date.now
    },

}) 

// we will create a new collecction

const Napkinjobtable= new mongoose.model('napkinjobtable', napkinjobtable);

module.exports=Napkinjobtable;

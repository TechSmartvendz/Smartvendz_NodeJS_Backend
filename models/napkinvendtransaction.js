const mongoose =require("mongoose");


const napkinvendtransaction=new mongoose.Schema({
 
   
    vend_pending_status:String,
    transactionId:String,
    providerReferenceId:String,
    amount:Number,
    paymentState:String,
    transactionDate:Date,
    payResponseCode:String,
    paymentModes_type:String,
    paymentModes_amount: String,
    paymentModes_utr: String,
    qrCodeId:String,
    posDeviceId:String,
    storeId:String,
    terminalId:String,
    mobileNumber:String,
    phoneNumber:String,
    name:String,
    startTimestamp:Date,
    endTimestamp:Date, 
    

}) 

// we will create a new collecction

const Napkinvendtransaction= new mongoose.model('napkinvendtransaction', napkinvendtransaction);

module.exports=Napkinvendtransaction;

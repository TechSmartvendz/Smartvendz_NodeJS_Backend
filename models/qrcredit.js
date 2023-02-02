const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");

const qrcredit=new mongoose.Schema({
 

    // storeId: 'snaxsmartstore1',
    // terminalId: '444f4r343443f443ff4',
    // merchantId: 'QRTV3442',
    // machineId: 'SVZBLR0100',
    // qrId: 'snaxsmartstore1444f4r343443f443ff4QRTV3442SVZBLR0100'
    
    success:Boolean,
    code:String,
    message:String,
    providerReferenceId:String,
    transactionId:String,
    internalTransactionId:{
        type:String,
        unique:true,
        default:InernalID
    },
    qrId:String,
    amount:{
        type:Number,
        require:true
    },
    paymentState:String,
    payResponseCode: String,

    vend_status:{
        type:Boolean,
        default:false
    },
    cycleDone:{
        type:Boolean,
        default:false
    },
    refund:{
        type:Boolean,
        default:false
    },
    refundStatus:{
        type:String,
        default:"NA"
    },
    refundAmount:{
        type:Number,
        default:0
    },
    refundError:{
        type:String,
        default:"NA"
    },
    refundDone:{
        type:Boolean,
        default:false
    },
    pending_job:{
        type:Boolean,
        default:false
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    jobdone_date: {
        type: Date,
    },   
    storeId:String,
    terminalId:String,
    machineId:String,
    merchantId:String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    machine:String,
    created_date: {
        type: Date,
        default: Date.now
    },
}) 

// we will create a new collecction

const QrCredit= new mongoose.model('qrcredit', qrcredit);

function InernalID(){

    const d=Date.now()
   return (d+this.terminalId)
}

module.exports=QrCredit;



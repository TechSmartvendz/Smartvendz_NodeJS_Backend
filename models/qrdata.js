const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");

const qrdata=new mongoose.Schema({
    qrId:{
        type:String,
        default:InternalQRID,
        unique:true,
        require:true
    },
    storeId:String,
    terminalId:String,
    merchantId:String,
    machineId:String,
    machineType:{
        type:String,
        default:"NONE"
    },
    qrPaymentGateway:String,
    activeStatus: {
        type:Boolean,
        default:true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
}) 

// we will create a new collecction

const QrData= new mongoose.model('qrdata', qrdata);

function InternalQRID() {
    var d = this.storeId+this.terminalId+this.merchantId+this.machineId
    // const intid = bcrypt.hash(d, 10);
    return d;
}

module.exports=QrData;

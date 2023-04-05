const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");

const qrtransaction=new mongoose.Schema({
    qrId:{
        type:String,
        require:true
    },
   qrCreditID:{
    type:String,
    unique:true,
    require:true
   },
   machine_id:String,
    slote_number:String,
    item_price:{type:Number,
        require:true,
       },
    status:{
        type:String,
        default:"InProcess"
    },
    error:{
        type:String,
        default:null
    },
    created_date: {
        type: Date,
        default: Date.now
    },
}) 

// we will create a new collecction

const QrTransaction= new mongoose.model('qrtransaction', qrtransaction);



module.exports=QrTransaction;




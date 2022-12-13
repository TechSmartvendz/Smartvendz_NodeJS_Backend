const mongoose =require("mongoose");
const validator = require("validator");

const transactionSchema=new mongoose.Schema({
   
    card_no:{type:Number,
          require:true,
         },
    titem:String,
    tdate:String,
    ttime:String,
    tstatus:String,
    tserial:Number,
    created_date: {
        type: Date,
        default: Date.now
    },
    price:{type:Number,
        require:true,
       },
    credit_wallet:{type:String,
        default:null,
       },
    credit_balance:{type:Number,
        default:null, 
       },
    admin_id:String,
    super_admin:String,
    local_admin:String,
    teid:String,
    machine_id:String,
    status:{
        type:String,
        default:"InProcess"
    },
    error:{
        type:String,
        default:null
    }
}) 

// we will create a new collecction

const Transaction= new mongoose.model('Transaction',transactionSchema);

module.exports=Transaction;


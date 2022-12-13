const mongoose =require("mongoose");
const validator = require("validator");

const pendingstatus=new mongoose.Schema({
    machine_id:String,
    transaction_id:{
        type:String ,
        require:true
    },
    card_number:{type:Number,
          require:true,
         },
    email:String,
    manager_email:String,
    employee_id:String,
    employee_name:String,
    install_location:String,
    item_description:String,
    tdate:String,
    ttime:String,
    slote_number:String,
    item_price:{type:Number,
        require:true,
       },
    credit_wallet:{type:String,
        default:null,
       },
    credit_balance:{type:Number,
        default:null, 
       },

    created_date: {
        type: Date,
        default: Date.now
    },
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

const Pendingstatus= new mongoose.model('Pendingstatus',pendingstatus);

module.exports=Pendingstatus;

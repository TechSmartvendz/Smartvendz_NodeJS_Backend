const mongoose =require("mongoose");
const validator = require("validator");

const rejectedcardSchema=new mongoose.Schema({
   
    card_no:{type:Number,
          require:true,
         },
    titem:String,
    tdate:String,
    ttime:String,
    created_date: {
        type: Date,
        default: Date.now
    },
    price:{type:Number,
        require:true,
       },
    admin_id:String,
    super_admin:String,
    local_admin:String,
    machine_id:String,
    error:{
        type:String,
        default:null
    }
}) 

// we will create a new collecction

const Rejectedcard= new mongoose.model('Rejectedcard',rejectedcardSchema);

module.exports=Rejectedcard;


const mongoose =require("mongoose");
const validator = require("validator");

const productSchema=new mongoose.Schema({
    // pid:{type:Number,
    //     require:true,
    //     unique:true
    //    },
    product_id:{
        type:String,
        require: true,
        unique:true
    },
    machine_id:String,
    company_id:String,
    slote_number:String,
    item_description:String,
    quantity:Number,
    item_price:Number,
    admin_id:String,
    created_date: {
        type: Date,
        default: Date.now
    }



}) 

// we will create a new collecction

const Product= new mongoose.model('Product',productSchema);

module.exports=Product;

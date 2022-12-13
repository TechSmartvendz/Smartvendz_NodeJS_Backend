const mongoose =require("mongoose");
const validator = require("validator");

const machineSchema=new mongoose.Schema({
   
    company_name: {
        type: String,
        require: true
    },
    machine_id: {
        type: String,
        require: true,
        unique: true
    },
    install_location: String,
    company_building_no: String,
    product_type: String,
    total_slots: {
        type: Number,
        require: true
    },
    company_id:{
        type: String,
        require: true
    },

    super_admin: {
        type: String,
        require: true
    },
    admin: {
        type: String,
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    slots_name: [{
        slote: String
    }]
}) 



const Machine= new mongoose.model('Machine',machineSchema);

module.exports=Machine;
const mongoose =require("mongoose");
const validator = require("validator");

const employeeSchema=new mongoose.Schema({
   
    iempid: {
        type: String,
        require: true,
        unique: true
    },
    card_number: {
        type: Number,
        require: true,
    },
    employee_id: {
        type:String,
        require: true,
    },
    employee_name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    manager_email:{
        type: String,
        require: true,
    },
    cost_center:{
        type: String,
        require: true,
    },
    department:String,
    cost_center_owner_name:String,
    company_id:{
        type:String,
        require:true
    },
    super_admin:{
        type:String,
        require:true
    },
    admin_id:{
        type:String,
        require:true
    },
    local_admin:{
        type:String,
        default:null
    },
    machine_id:{
        type:String,
        default:null
    }


}) //don't change the employee schema parameter (card_number) name, then u have change in (app.js:78,83) file where it compare with card number coming from get request from the vending machine........// 

// we will create a new collecction

const Employee= new mongoose.model('Employee',employeeSchema);

module.exports=Employee;

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    company_name: {
        type: String,
        require: true

    },
    company_id: {
        type: String,
        require: true

    },
    company_address: {
        type: String,
        require: true

    },
    company_location: {
        type: String,
        require: true

    },
    company_building_no: {
        type: String,
        require: true

    },
    contact_person_name: {
        type: String,
        require: true

    },
    contact_person_email: {
        type: String,
        require: true,
        unique:true
    },
    contact_person_phone: {
        type: String
    },
   
    password: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type:String,
        default:"Admin"
    },
    otp: {
        type:Number,
        default:""
    },
  
    token: {
            type: String,
            required: true
        },
    superadmin: {
            type: String,
            required: true,
            default:"null"
        }
 

    
})

//middleware for JWT TOken.....
userSchema.methods.generateAuthToken = async function () { //middleware for generate token and store this registration token in DB token array.
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);//generate token by jwt.sign method.
       // console.log(token);
        this.token=token;
        await this.save().then(function (doc) {
            //console.log("Token created and saved");
            }).catch(e => {console.log("error in saving token in db\n"+e)});
        return token;// return token to middleware method call in server.js 
    }catch (error) {
        res.status(405).send("the error part the error part of jwt middleware in user schema " + error);
        console.log("the error part of jwt middleware in user schema" + error);
    }
}

const User = new mongoose.model('User', userSchema);

module.exports = User;
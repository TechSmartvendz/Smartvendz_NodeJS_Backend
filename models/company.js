const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const companySchema = new mongoose.Schema({
    company_name: {
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
    tokens: [{                  // token array scehma for session store in DB
        token: {
            type: String,
            required: true
        }
    }]




})
//middleware for JWT TOken.....
companySchema.methods.generateAuthToken = async function () { //middleware for generate token and store this registration token in DB token array.
    try {
        // console.log(this.id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);//generate token by jwt.sign method.
        this.tokens = this.tokens.concat({ token: token })// concate or store this token in data base.
        await this.save();// save this token in DB.
        // console.log(token);
        return token;// return token to middleware method call in server.js 

    } catch (error) {
        res.send("the error part " + error);
        console.log("the error part " + error);

    }
}


//middleware for hashing.....(Currently not in use )
companySchema.pre("save", async function (next) {

    if (this.isModified("password")) {// this is run only when the password is modified.....
        // const passwordHash=await bcrypt.hash(password, 10);
        //console.log(`the current password is ${this.password}`);
        //this.password=bcrypt.hash(this.passwprd,10);//comment this middle because hashing already done in server.js file.
    }
    next();
})

// we will create a new collecction

const Company = new mongoose.model('Company', companySchema);

module.exports = Company;

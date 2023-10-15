const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const employeeSchema=new mongoose.Schema({
    name:{type:String,
    required:true
    },
    Email:{
    type:String,
        required:true,unique:true
    },
    mobile:{type:Number,
        required:true,unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
employeeSchema.pre("save",async function(next){
    // const passwordHash=await bcrypt.hash(password,10);
    if(this.isModified("password")) {
        this.password=await bcrypt.hash(this.password,10);
        this.confirmpassword=undefined;
    }
    next();
})

//now collection
const Register=new mongoose.model("entry",employeeSchema);
module.exports=Register;
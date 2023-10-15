const express=require("express");
const path=require("path");
const hbs=require("hbs");
const ejs=require("ejs");
const nodemailer = require('nodemailer');
require("./db/connect");
const Register=require("./modles/registers")
const e = require("express");
const bcrypt=require("bcryptjs");


const app=express();
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")
//app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
// app.set("veiws",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("index");
 // res.send("welcome")
});
app.get("/resistration",(req,res)=>{
    res.render("resistration");
});
app.post("/resistration",async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password === cpassword )
        {
            const registerEmploye=new Register({
                name:req.body.name,Email:req.body.Email,mobile:req.body.mobile,password:req.body.password,confirmpassword:req.body.confirmpassword
            })

            const registrations= await registerEmploye.save();
            res.status(201).render("index");
        }else
        {
            res.send("Password Are NOt Matched ");
        }
    }catch(error){
        res.status(400).send(error);
    }
});

app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/forgot",(req,res)=>{
   res.render("forgot");
   res.send("Work in progress please wait!!")
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
});

app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await Register.findOne({Email:email});
        //console.log(useremail);
        const checkpass=useremail.password;
        const passhash= bcrypt.compare(password,checkpass);
        if(passhash)
        {
            res.status(201).render("index");

        }else{
            res.send("Invalid Credential");
        }
    }catch(error){
        res.status(400).send("invalid Credential")
    }
});

//forgot
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'vipul.hedaoo.ex@ghrce.raisoni.net',
//         pass: 'Vipul@123'
//     }
// });
// const mailOptions = {
//     from: 'vipul.hedaoo.ex@ghrce.raisoni.net',
//     to: 'piyush.barbate.me@ghrce.raisoni.net',
//     subject: 'Sending Email using Node.js',
//     text:'1101'
// };
//
//
// app.post("/forgot",async (req,res)=>{
//     try{
//         const mail=req.body.email;
//         const otp=req.body.otp;
//         const password=req.body.newpassword;
//         const otpc=1101;
//         if(otp===otpc){
//
//             const forgotpass=await Register.updateMany({Email:mail},{$set:{password:password,confirmpassword:password}});
//         }else{
//             res.send("Invalid Credential");
//             res.status(201).render("forgot");
//         }
//     }catch{
//         res.status(400).send("invalid Credential")
//     }
// });

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});






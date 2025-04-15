const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")
const validUser = require("./utils/validateuser")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser())


app.post("/register", async (req,res)=>{

    try{

        // Validate kya uske andar firstName
        validUser(req.body);
        
        //  converting password into hashing
       req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body);
        res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error "+ err.message);
    }
})



app.post("/login", async(req,res)=>{

    try{

        // validate karna
        // user ko id  nhi pta h isliye email hi pta hota h use dhundhna
        const people = await User.findOne({emailId:req.body.emailId});
        
        // if(!(req.body.emailId===people.emailId))
        //     throw new Error("Invalid credentials");

        const IsAllowed = await bcrypt.compare(req.body.password, people.password);

        if(!IsAllowed)
            throw new Error("Invalid credentials");
        

        // jwt token 
// npm jsonwebtoken
//  7 din bd loginnhi hoga expire nhi hoga. rohut vli key sekret hoi serverpr db pr nhi hogi.
        const token = jwt.sign({_id:people._id, emailId:people.emailId},"Rohit@13412$",{expiresIn:"7d"}); // rohit key hedr khud ho jega

        res.cookie("token",token); // yha se bheji  info me get ki
        res.send("Login Successfully");

    }
    catch(err){
        res.send("Error: "+err.message);
    }
})

app.get("/info", async(req,res)=>{

    try{

       // npm i cookie-parser
       // validate the user first
       
       const payload =  jwt.verify(req.cookies.token,"Rohit@13412$");
    //    if valid user then payload
       console.log(payload);
    //     muje body me id nhi bhejni pdegi ase  bhej skte h cookie me
    //    const result = await User.findById(payload._id);

       const result = await User.find();
    //    console.log(req.cookies);
    //    res.send(result);
       


       res.send(result);
    }
    catch(err){
        res.send("Error"+err.message);
    }
})

app.get("/user", async(req,res)=>{
    
    try{

        // code likhna padege, user ko authenticate kar paauon
        const payload =  jwt.verify(req.cookies.token,"Rohit@13412$");
        // console.log(payload);
        const result = await User.findById(payload._id);
        res.send(result);

    }
    catch(err){
       
        res.send("Error"+err.message);
    }


})

app.delete("/user/:id", async (req,res)=>{

    try{
        await User.findByIdAndDelete(req.params.id);
        res.send("Deleted Succesfully");
    }
    catch(err){
        
        res.send("Error"+err.message);
    }


})

// {
//     "_id":"67ec0a8bffe09233dc9c93fc",
//     "age": 12,
//     "emailId": "mohan@gmail.com"
// }

app.patch("/user", async(req,res)=>{

    try{
        const {_id, ...update} = req.body;

        await User.findByIdAndUpdate(_id,update,{"runValidators":true});
        res.send("Update Succesfully");
    }
    catch(err){
        res.send("Error "+err.message);
    }
})



main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));




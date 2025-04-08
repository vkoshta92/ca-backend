const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")

app.use(express.json());


app.post("/register", async (req,res)=>{

    try{
 //  api level validation because resistered user error nnhi deta h uniuqe hai tb bhi.
        // Validate kya uske andar firstName
        // req.body ke andar data aaya hai, usmein first_name persent hona chaiye
        const mandatoryField = ["firstName","emailId","age"]

        const IsAllowed = mandatoryField.every((k)=> Object.keys(req.body).includes(k));

        if(!IsAllowed)
            throw new Error("Fields Missing");

        await User.create(req.body);
        res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error "+ err.message);
    }
})

app.get("/info", async(req,res)=>{

    try{
       const result = await User.find();
       res.send(result);
    }
    catch(err){
        res.send("Error"+err.message);
    }
})

app.get("/user/:id", async(req,res)=>{
    
    try{
        
        const result = await User.findById(req.params.id);
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
// taki valitae usera me schema me work kre .
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




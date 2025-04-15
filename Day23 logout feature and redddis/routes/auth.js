const express = require("express");

const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/users")

// /auth/register

authRouter.post("/register", async (req,res)=>{

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



authRouter.post("/login", async(req,res)=>{

    try{

        // validate karna
        
        const people = await User.findOne({emailId:req.body.emailId});
        
        // if(!(req.body.emailId===people.emailId))
        //     throw new Error("Invalid credentials");

        const IsAllowed = people.verifyPassword(req.body.password);

        if(!IsAllowed)
            throw new Error("Invalid credentials");
        

        // jwt token 

        const token = people.getJWT();

        res.cookie("token",token);
        res.send("Login Successfully");
    }
    catch(err){
        res.send("Error: "+err.message);
    }
})


// /auth/logout

authRouter.post("/logout", async(req,res)=>{

    try{
// null ki jgh  ki bhi strig bhej skte hai kyo falru string bhejni hai.
// date.now turnt delete kr dega cookie ko ligout ho jega.
// hm log jwt to khud se nhi expire kr skte , jwt stateless hota hai.
// yha cookie abhi bhi expire nhi hui h koi bhi copy krke dobra login kr skta ha
// purani cookie ko db me store krke lenge tki user aye check kr le ye block list me nhi hai. block token


// token expire- db delete
// db call  bar bar 
// redis sri probles ko solve krta hai ye ak db h bhut fast hai. ye km bhut hi jldi krta hai.
// redis direct ram me opertaion krta h normal mongodb ssd me krta h phir ram me krta hai.
// redis me permant data nhi rkhte hai jse cookies ko ko rkhenge tki logout  ho jae.
// redis ko alg ram me rkhte hai  tki db and redis me ldai na ho.
// redis costly h mongodb se.
// jab user bar bar refresh kr rha h tb bhi hm rduis server ko  use kar skte hai 
// jo data bar bar use ho reerha h as a cacge vo  data bar br use kr skte h redis h pafe refresh krke db call nhi krni  padegi har bar.
// kistni de data rkha h redis ko vo mer hthme hai.
// redis  bhi replika bnata h sharding krke rkhta hai.
// reddis jse bhut inmaemry db h unko bhi use kar skte hai.
       res.cookie("token",null,{expires: new Date(Date.now())});
       res.send("Logged Out Succesfully");
    }
    catch(err){
        res.send("Error: "+err.message);
    }
})

module.exports = authRouter
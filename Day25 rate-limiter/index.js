const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")
const validUser = require("./utils/validateuser")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const userAuth = require("./middleware/userAuth");
require('dotenv').config()
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const commentRouter = require("./routes/comment")
const redisClient = require("./config/redis");
const rateLimiter = require("./middleware/rateLimiter");

//  rate  limiter if bhut bar  get request   mre.
// cliet ke ip se vlue 60 times request ttl 1 hours me
// hr eq ke bich gap hona chiye 2 req lagatar bheji ti vo wait kre.

// fix window- 1 ghnte me 60 request mrni hsbme gap bhi   rkhhna h
// sliding window  man lo  5 min bad 59 req mar di to window slide ho jege next 1 hours me  hi 60 req hongi jb phla time nikl jega tb dobra 59 mrna chta h mar skta hai. window slide hoti rhgi jitni request mrga phlle. redis sliding window ko imlement krega.



app.use(express.json());
app.use(cookieParser())

app.use(rateLimiter);

app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/comment", commentRouter);




const InitlizeConnection = async ()=>{
    
    try{
         
        // await redisClient.connect();
        // console.log("connected to Reddis");

        // await main();
        // console.log("connected to MongoDB");

        await Promise.all([redisClient.connect(),main()]);
        console.log("DB connected");


        app.listen(process.env.PORT, ()=>{
            console.log("Listening at port 3000");
        })
    }
    catch(err){
        console.log("Error: "+err);
    }
}

InitlizeConnection();





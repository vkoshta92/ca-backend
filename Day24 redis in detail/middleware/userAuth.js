const jwt = require('jsonwebtoken');
const User = require("../Models/users");
const redisClient = require('../config/redis');


const userAuth = async (req,res,next)=>{

    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token Doesn't exist");
        }

        const payload =  jwt.verify(token,process.env.SECRET_KEY);
        // console.log(payload);

        const {_id} = payload;

        if(!_id){
            throw new Error("Id is missing");
        }

        const result = await User.findById(_id);

        if(!result){
            throw new Error("User Doesn't exist");
        }

// check krega ye token redish me to block list me to nhi hai.
// ab dobara agar token to copy kiya to check kr lega block  me redis me pda hoga to   data get nhi hoga dobara.
//logout  me to token usse nhi ho pyega pr get request me aa jega gar use check nhi lgenge exists vla.
        const IsBlocked = await redisClient.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid Token");

        req.result = result;


        next();
    }
    catch(err){
        res.send("Error: "+ err.message)
    }

}

module.exports = userAuth;
const redisClient = require('../config/redis');


const rateLimiter = async (req,res,next)=>{

    try{
        const ip = req.ip;
        console.log(ip);

        // Kya ye Ip exist karta hai

        // nahi karta
        // set method redisClient.set(ip,`1:${Date.now()/1000}`)
        // await redisClient.expire(3600);


        // Exist karta hga:
        // get

        const number_of_request = await redisClient.incr(ip);

        if(number_of_request>10){
            throw new Error("User Limit Exceeded");
        }

        if(number_of_request==1){
            await redisClient.expire(3600);
        }

        console.log(number_of_request);

       next();

    }
    catch(err){
        res.send("Error: "+err);
    }

}


module.exports = rateLimiter;


// ::1
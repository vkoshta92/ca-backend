const redisClient = require('../config/redis');

//  rate  limiter if bhut bar  get request   mre.
// cliet ke ip se vlue 60 times request ttl 1 hours me
// hr eq ke bich gap hona chiye 2 req lagatar bheji ti vo wait kre.

// fix window- 1 ghnte me 60 request mrni hsbme gap bhi   rkhhna h
// sliding window  man lo  5 min bad 59 req mar di to window slide ho jege next 1 hours me  hi 60 req hongi jb phla time nikl jega tb dobra 59 mrna chta h mar skta hai. window slide hoti rhgi jitni request mrga phlle. redis sliding window ko imlement krega.

// if alg alg log req bhej rhe h resultke din to autoscaling km ayega serverr bdege to rate limiter work nhi krega.
//
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

        // ip-1
        // ::1  ip address
// ye key value set krna h agar ip first time ayi h 1 kr dega nhi to usko increment kr dega.
// agar wifi same h sbki ip same hogi to kisi ne  60 req mr di  ab dusre user ko 1 hours wait krna pdega.
        const number_of_request = await redisClient.incr(ip);

        if(number_of_request>10){
            throw new Error("User Limit Exceeded");
        }

        if(number_of_request==1){
            await redisClient.expire(3600); //60 minute ke liye hi ttl rkhna h
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
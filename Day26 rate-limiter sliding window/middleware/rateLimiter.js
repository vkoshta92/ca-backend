const redisClient = require('../config/redis');

// Total Time: 60 min
const windowSize = 3600;
const MaxRequest = 60;

// sliding window use kiya hai.
const rateLimiter = async (req,res,next)=>{

    try{
        const key = `IP:${req.ip}`;
        const current_time = Date.now()/1000;  // second thats why divide.
        const window_Time = current_time - windowSize;
        // 1.20 min -1hour = 12.20 = 3122312
        
        //  remove kr denge pichle ak gjnte ka
        await redisClient.zRemRangeByScore(key, 0, window_Time);

        const numberOfRequest = await redisClient.zCard(key);
        // Total number of value kitni hai

        if(numberOfRequest>=MaxRequest){
            throw new Error("Number of Request Exceeded");
        }

        //  random ki jgh cryto  library se random nikalenge.
       
        await redisClient.zAdd(key,[{score:current_time, value:`${current_time}:${Math.random()}`}]);
        // Request is added

         //  hr request ke sth bdna hoga.    jitni bar request ayegi key ki expire badenge nhi badaya to  koi ak min 50 mrega ale min 100 mrega. agar 12.10 pe  reuest mra to 1.10 tk ttl extend kr denge.
        // Key TTL hai usko increase karna
        await redisClient.expire(key,windowSize);
        next();
    }
    catch(err){
        res.send("Error: "+err);
    }

}


module.exports = rateLimiter;


// ::1
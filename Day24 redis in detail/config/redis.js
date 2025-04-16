
// const redis = require('redis');

// const redisClient = redis.createClient({
//     username: 'default',
//     password: 'IvChtRNM7dLsOoJOtNSpaVj055cG4BC3',
//     socket: {
//         host: 'redis-19934.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 19934
//     }
// });



// module.exports = redisClient;




const redis = require('redis');

const redisClient = redis.createClient({
    username: 'default',
        password: 'tLfbaTrn0SLwOs297nBbyVzZIJxRUMR7',
        socket: {
            host: 'redis-11870.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
            port: 11870
    }
});



module.exports = redisClient;



// const connectRedis= async ()=>{
//     await redisClient.connect();
//     console.log("Connected to Redis");
// }

// connectRedis();

//  rate  limiter if bhut bar  get request   mre.
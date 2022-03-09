const redisPort = 6379
const redis = require("redis");
const Redisclient = redis.createClient(redisPort);

//log error to the console if any occurs
Redisclient.on("error", (err) => {
    console.log(err);
});

export const redisclient = Redisclient;
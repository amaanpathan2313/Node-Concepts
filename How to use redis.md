                                                 # All About Redis # ( Cashing )

    - Redis is a temporary data storing data base therefore in redis there is no schema, model we only store data in RAM.


  To open redis in terminal : redis-cli

*  Operation in redis

1.  To set data =>  set key "value"

2.  To get data =>  get key 

3.  To delete data =>  del key

4.  To set data  + Expiry =>  set key "value" EX 10  //   means after 10 second this data are delete from temp memory


* Driver of redis  ==> Use to connect redis with node.js & perform operations

1 Redis driver => Develop by redis developers 

2 IO-Redis driver => Develop by Other developers 

# Process to connect

const Redis = require("ioredis");
 
const redis = new Redis();



  redis.set("my key", "1st time i was implement redis with node.js", );  //  set data

  redis.set("myKey", "hello", "EX", 10);  // ste data with expiry

  redis.del("myKey");  // delete data
  
 



redis.set("myKey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style

redis.get("myKey", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
});
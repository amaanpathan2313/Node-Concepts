const express = require('express');
const connectDataBase = require('./configs/mongo_config');
const authRouter = require('./routers/auth.route');
const todoRouter = require('./routers/todo.route');
const redis = require('./configs/redis.configs');
require('dotenv').config()

const app = express();

app.use(express.json());  // JSON Body parser in build middleware

const PORT = process.env.PORT ||  3000;
connectDataBase() //  Data Base connection

  // redis.set("my key", "1st time i was implement redis with node.js", );  //  set data

  // redis.set("mykey", "hello", "EX", 10);  // ste data with expiry

 

app.get('/test', (req, res) => {
     res.json({msg : "Test Router"})
})


app.use('/auth', authRouter);

app.use('/todo', todoRouter);


app.use((req,res) => {
    res.status(404).json({msg : "Page Not Found !"})
})

app.listen(PORT, () => {
    console.log("Server start on port 3000")
})
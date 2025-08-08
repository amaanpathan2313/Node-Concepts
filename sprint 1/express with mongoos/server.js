
//                             server.js ==> is only use for calling route

const express = require('express');  // import express
const connectToDataBase = require('./configs/mongoDBConfig');
const userRouter = require('./routers/userRouter');
 
connectToDataBase()
 
const app = express();   //  initialize express
 
app.use(express.json());    //     JSON body parser inbuilt middleware

app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Server start on port 3000")
})









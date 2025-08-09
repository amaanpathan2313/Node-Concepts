
const express = require('express');
const connectDB = require('./config/db.config');
const userRouter = require('./routers/user.route');

const app = express();

app.use(express.json());  //  Json Body parser ||  Inbuilt middleware

connectDB();

app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Server start on port 3000")
})
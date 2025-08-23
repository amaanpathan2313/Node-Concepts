const express = require('express');
const connectDataBase = require('./configs/mongo_config');
const authRouter = require('./routers/auth.route');
const todoRouter = require('./routers/todo.route');
require('dotenv').config()

const app = express();

app.use(express.json());  // JSON Body parser in build middleware

const PORT = process.env.PORT ||  3000;
connectDataBase() //  Data Base connection

 

app.get('/test', (req, res) => {
     res.json({msg : "Test Router"})
})


app.use('/auth', authRouter);

app.use('/todo', todoRouter);

app.get('/login' , (req, res) => {
    res.json({msg : "Please login again ......."})
})

app.use((req,res) => {
    res.status(404).json({msg : "Page Not Found !"})
})

app.listen(PORT, () => {
    console.log("Server start on port 3000")
})
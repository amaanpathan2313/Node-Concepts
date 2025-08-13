require('dotenv').config();
const express = require('express');
const connectDataBase = require('./config/db.config');
const courseRouter = require('./routers/course.route');
const enrollmenteRouter = require('./routers/enrollment.route');
const studentRouter = require('./routers/student.route');

const app = express();

app.use(express.json());  // JSON body parser middleware || in build middleware

connectDataBase();

app.get('/test', (req, res) => {
    res.status(200).json({msg : "I am Test route"})
})

app.use('/lms', studentRouter)

app.use('/lmss', courseRouter)

app.use('/lms', enrollmenteRouter)


app.get((req, res) => {
    res('<h1>I am  Default route </h1>' )
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})






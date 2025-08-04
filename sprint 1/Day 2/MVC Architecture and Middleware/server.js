
const express = require('express');
const logsData = require('./middlewares/logsData');
const courseRoute = require('./routes/courseRoutes');

const app = express();

app.use(express.json());  //  express.json()  it is a in build middleware


app.use('/courses', logsData,courseRoute)


app.listen(3000, () => {
    console.log("Server start on port No. 3000")
})

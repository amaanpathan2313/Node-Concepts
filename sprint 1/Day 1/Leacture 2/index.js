

const express = require('express');  // import the express

const app = express();  // call the express 

const port = 3000;  // give a port no.   3000 \ 5000 \ 8000  
                    // port is the communication channel of the system where express take the request and send the response


app.get('/test', (req, res) => {
    // req : Send by the client
    // res : given by the app
    res.send("This is the Text Route !")
})

app.get('/home', (req, res) => {
    res.send("I am Home");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)  //  Establish the connection with the help of port number
})


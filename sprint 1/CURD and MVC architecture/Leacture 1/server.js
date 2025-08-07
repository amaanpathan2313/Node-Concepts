
const express = require('express');  // Import the express

const app = express();  //  initialize the express function

app.use(express.json())

app.get('/test', (req, res) => {   ///  create test route
    res.send("This is test Route")
})

app.get('/test2', (req, res) => {   //  res.send support all HTML tags
    res.send(`<h1>Hii I am res.send method also support all HTML Tags</h1>`)
})

app.get('/json-data', (req, res) => {   //   we use this when front-end need only JSON
    res.json({"name" : 'Tony', "age" : 20})
})

app.post('/add-data', (req, res) => {
    console.log(req.body);   // we add JSON data so we have to add  body parser function which sense JSON data and parse it => app.use(express.Json())
    res.send("Data was Added !")
})
app.patch('/patch-data', (req, res) => {
    res.send("Data Patched !")
})
app.delete('/delete', (req, res) => {
      res.send("Data was  Deleted !")
})

app.listen(3000, () => {
    console.log("Server was started on port no. 3000");  //  listen the port where server listen the request
})
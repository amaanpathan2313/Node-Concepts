
const express = require('express');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); 

// app.use(bodyParser.json());
app.use(express.json());

app.use(express.json({limit : '10mb'}));

app.use(express.urlencoded({extended : true}));


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRETE
});


const upload = multer({dest : 'uploads/'});

app.post('/upload', upload.single('file'), async(req, res) => {

    try {

        console.log(`Receive file : ${req.file}`);

        if(!req.file){
            return res.status(500).json({msg : "File not found !"})
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder : 'uploads'
        });

        res.status(201).json({url : `${result.url}`})

        console.log(result.secure_url);
        
    } catch (err) {
         res.json({err : `Error :  ${err.message}`})
    }
})



app.listen(PORT, () => {
    console.log(`Server start on PORT : ${PORT}`)
})
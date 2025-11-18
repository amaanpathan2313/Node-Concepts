 
 const mongoose = require('mongoose');
 require('dotenv').config();
 

 const connectDataBase = async() => {

    try {

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Data Base successfully Connected ! ")
        
    } catch (err) {

        console.log(`Data Base connection Error : ${err.message}`)
        
    }

 };

 module.exports = connectDataBase;
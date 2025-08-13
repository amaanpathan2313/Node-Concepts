
require('dotenv').config()
const mongoose = require('mongoose');

const connectDataBase = async () => {
    console.log(process.env.MONGO_URL)
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Data Base connected Successfully !");
        
    } catch (error) {
        
        console.log("Data Base connection Issue !");
        
    }
    
}

module.exports = connectDataBase;
 
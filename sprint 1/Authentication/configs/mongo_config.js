
const mongoose = require('mongoose');

const connectDataBase = async () => {
    
    try {
        // console.log(process.env.MONGO_URL)

       await mongoose.connect(process.env.MONGO_URL);
       console.log("Data Base Connected !")
        
    } catch (error) {

        console.log("Error on Data Base connection !")
        
    }
}


module.exports = connectDataBase;



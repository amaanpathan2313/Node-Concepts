
const mongoose = require('mongoose');

const connectDataBase = async () => {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/library-DataBase');

        console.log("Data Base connect Successfully !")
        
    } catch (error) {

        console.log("Data Base connection Error !")
        
    }
}



module.exports = connectDataBase;
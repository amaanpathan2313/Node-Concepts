
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/library-DataBase');
        console.log("Database was successfully Connected !")
    } catch (error) {
        console.log("Issue occur while Database connection !")

    }
}

module.exports = connectDB;
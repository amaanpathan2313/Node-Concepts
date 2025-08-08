
//  in this file we create a function that connect mongo DB with node.js

const mongoose = require('mongoose');

// connect express with data-base

const connectToDataBase = async () => {
    try { //                                                   backendtest is is database name
        await mongoose.connect('mongodb://127.0.0.1:27017/backendtest')
        console.log("Data base are successfully connected !")

    } catch (error) {

        console.log(`SomeThing went wrong while DB connection ${error}`)
    }

}

module.exports = connectToDataBase;

const mongoose = require('mongoose');

//  Create schema
//                     Here we create copy of constructor function ||  it is blue print of each field of user in document to be maintain
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    ageIsAbove20: Boolean,
})


//create model
//              name of the collection ,  structure of schema || data ||  Blue print to be maintain
const UserModel = mongoose.model("Users", userSchema);
//    UserModel =   mongoose.model is responsible for database interaction

module.exports = UserModel;
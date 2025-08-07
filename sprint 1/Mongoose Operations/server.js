
const mongoose = require('mongoose');  //   import mongoose

//  Establish Connection with MongoDB

const connectToDataBase = async () => {
    try {
        //  mongoose.connect It is  function proved4e by mongoose to establish connection between backend Logic with Data Base
        //               ||
        await mongoose.connect('mongodb://127.0.0.1:27017/backendtest')  // It is as same as fetch function  .  / DataBase name to be used or create E.g :  backendtest
        //  Database Name : backendtest
        console.log("Connection Stablish Successfully with MongoDB")
    } catch (error) {
        console.log(error);
    }
}

connectToDataBase();

//  After connection was successfully stablish  create a schema
//  Schema is basically a structure Or blue print of how a typically document should be look in database.

//  mongoose.Schema is constructor function of mongoose we get copy of that constructor function to create schema.
//  It was except object in that object we specify fields  ||  How user Document look

const userSchema = new mongoose.Schema({    //  it is a blue print how each user document look in database
    name: String,
    age: Number,
    location: String,
    isMarried: Boolean,
});


// Schema will directly interact with MongoDB ?  ==>   No
// Schema just help to maintain structure of how each field in document look.
//  Model is responsible to interact with DB.
// Model is a constructor which connect collection with schema.

//   mongoose.model is a function use to stablish connection between collection with schema.
const UserModel = mongoose.model("User", userSchema)  //  (collectionName,  schema To Be Used)
//                              collection Name : User


//  Interact with DB :  When 1st time we make interaction with DB at that time Database and collection was create in DB.

//  There are 2 methods to add Data in database  :   There is no insertOne or insertMany
//                     1. .create()
//                     2.  new and .save()

//  UserModel.create is a function to create and add data Or schema in Collection
// UserModel.create({ name: "Amaan Pathan", age: 23, location: "Panvel", isMarried: false }).then(() => console.log("Data add in DataBase"))


const newUser = new UserModel({ name: "Sharukh Khan", age: 23, location: "South Mumbai", isMarried: true })

newUser.save().then(() => {
    console.log("Data add in DataBase")
}).catch((error) => {
    console.log(error)
})
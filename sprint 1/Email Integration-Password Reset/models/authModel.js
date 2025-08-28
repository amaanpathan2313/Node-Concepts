
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        userName: { type: String },
        email: { type: String, unique: true },     //   required: true
        password: { type: String },                //required: true
        role: { type: String, enum: ["user", "admin"], default: "user" },
        userId: { type: Number }
    }
);

//                         collection Name , Schema Name
const AuthModel = mongoose.model("userAuth", authSchema);

module.exports = AuthModel;
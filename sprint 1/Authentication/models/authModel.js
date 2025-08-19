
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
);

//                         collection Name , Schema Name
const AuthModel = mongoose.model("userAuth", authSchema);

module.exports = AuthModel;
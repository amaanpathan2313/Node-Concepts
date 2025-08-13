
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String, required: true, minlength: 3
        },
        email: {
            type: String, required: true, unique: true  //  unique is not a validator its only assign unique indexing to data
        },
        borrowedBooks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "books"
            }
        ]
    }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
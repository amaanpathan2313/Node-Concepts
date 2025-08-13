
const mongoose = require('mongoose');

let date = new Date().toLocaleString();

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String, required: true, minlength: 3
        },
        author: {
            type: String, required: true
        },
        status: {
            type: String, required: true, default: "available", enum: ["available", "borrowed"]
        },
        borrowers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        ],
        createdAt: { type: Date, default: date }

    }
);

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;
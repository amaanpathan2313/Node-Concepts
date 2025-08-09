
const mongoose = require('mongoose');

const orderScheme = new mongoose.Schema(            //  creating a sub document
    {
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        modeOfPayment: { type: String, required : true, enum: ["COD", "UPI", "Bitcoin", "Card"] }
    }
)

const UserSchema = mongoose.Schema(  //   validator
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, default: "123456" },
        age: { type: Number, min: 20, max: 100 },
        gender: { type: String, enum: ["male", "female"] },
        orders: [orderScheme], //  embedding sub document into main schema
        address: [
            {                  //  It is a nested document ==> document inside the document 
                houseNo: { type: Number, required: true },
                area: { type: String, required: true },
                landmark: String,
                pincode: { type: Number, required: true },
                city: { type: String, required: true }
            }
        ]

    }
);

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
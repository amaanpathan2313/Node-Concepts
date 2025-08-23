

//  email validator
 
const mongoose = require('mongoose');
var validator = require('validator');



const authSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return validator.isEmail(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: { type: String, required: true, minlength: 6 }
    }
);



const AuthModel = mongoose.model('auth', authSchema);


module.expo




        const hash = await bcrypt.hash(password, saltRounds);

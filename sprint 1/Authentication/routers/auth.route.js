const express = require('express');
const bcrypt = require('bcrypt');
const AuthModel = require('../models/authModel');
const saltRounds = 10;                        //   10 = 10 time hash the password 
var jwt = require('jsonwebtoken');
 const authRouter = express.Router();

//  Signup User

authRouter.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(500).json({ msg: "Internal server error", err })
            } else {
                console.log(`password : ${password} and Hash Password : ${hash}`);
                await AuthModel.create({ userName, password: hash, email })    //   password: hash Obj key value pair
                res.status(200).json({ msg: `${userName} Successfully Register` })
            }

        });

    } catch (error) {

        res.status(500).json({ msg: "Internal server error", error })

    }
})

//  Login User
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //  check user is present or not
        const user = await AuthModel.findOne({ email });

        if (!user) {
            // if user is not present 
            res.status(404).json({ msg: "User Not Found !" });
            return;
        }

        const hash = user.password; // hash password fetch from data base

        if (user) {
            bcrypt.compare(password, hash, function (err, result) {

                if (err) {
                    res.status(500).json({ msg: "Internal Server Error ! ", err });
                } else {
                    if (result) {
                        const token = jwt.sign({userId : user._id}, process.env.JWT_TOKEN);

                        res.status(200).json({ msg: "User Successfully Login !" , token})
                    } else {
                        res.status(405).json({ msg: "Please enter correct password !" })
                    }
                }

            });
        }

     

    } catch (error) {

        res.status(500).json({ msg: "Internal Server Error ! ", error });

    }
})



module.exports = authRouter;
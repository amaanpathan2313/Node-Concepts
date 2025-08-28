const express = require('express');
const bcrypt = require('bcrypt');
const AuthModel = require('../models/authModel');
const saltRounds = 10;                        //   10 = 10 time hash the password 
var jwt = require('jsonwebtoken');
const authRouter = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2')
require('dotenv').config();
const nodemailer = require("nodemailer");

//  Signup User

authRouter.post('/signup', async (req, res) => {
    const { userName, email, password, role } = req.body;

    try {

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(500).json({ msg: "Internal server error", err })
            } else {
                console.log(`password : ${password} and Hash Password : ${hash}`);
                await AuthModel.create({ userName, password: hash, email, role })    //   password: hash Obj key value pair
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
                    if (result) { //  user Id and user roll also encrypted in token

                        //  Algorithm use for encryption   |  data should be encrypted in token |  Secrete key           
                        //                Header         |      Payload                       | Signature
                        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: 5000 });

                        res.status(200).json({ msg: "User Successfully Login !", token })
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

//  Github OAuth

passport.use(new GitHubStrategy({            //   It work as middleware  and return the profile if person already user of github
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // console.log("Profile from github : ", profile);
        return done(null, profile);  ///  done == next()  and profile return req.user as we send from authMiddleware
    }
));


authRouter.get('/auth/github',      //    It calls github login / authorization page    
    passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/auth/github/callback',   // it is  Callback route in case of Login Success Or Failure
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    async function (req, res) {
        // console.log(req.user.id)   //  
        // Successful authentication, redirect home.
        // res.redirect('/');

        const gitHubUserId = req.user.id;

        const user = await AuthModel.find({ userId: gitHubUserId });

        if (user.length == 0) { //  If user not found then store user on DB and generate token
            const newUser = await AuthModel.create({ userId: gitHubUserId })
            //  generate token

            //  Algorithm use for encryption   |  data should be encrypted in token |  Secrete key           
            //                Header         |      Payload                       | Signature
            const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_TOKEN);
            console.log(newUser)
            console.log(token)


            res.json({ msg: "Login Success !", token })

        } else {
            ///  If user found then directly send the token

            //  Algorithm use for encryption   |  data should be encrypted in token |  Secrete key           
            //                Header         |      Payload                       | Signature
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_TOKEN);

            res.json({ msg: "Login Success !", token })
        }


    });


//  sending Email

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "amanpathan348@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    },
});

authRouter.get('/send-email', async (req, res) => {

    const info = await transporter.sendMail({
        from: '"Amaan Company" <amaan@company.com>',
        to: "pamaan44@gmail.com, amaan.pathan23@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body  //  at a time we can only send 1 body either text OR html
        html: "<b>Hello world?</b>", // HTML body
    });
    res.status(200).json({ msg: "Mail Send" })
})

//  forget password 
authRouter.post('/forgetPassword', async (req, res) => {

    const { email } = req.body;
    try {

        const user = await AuthModel.findOne({ email: email });
        console.log(user)

        if (!user) {
            res.status(404).json({ msg: "User Not found ! " });
            return;
        }

        var token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

        const forgetPasswordLink = `http://localhost:3000/auth/reset-password?token=${token}`

        //  send mail to email id

        await transporter.sendMail({
            from: '"Amaan Company" <amaan@company.com>',
            to: user.email,
            subject: "Password Reset Link",
            // text: "Hello world?", // plain‑text body  //  at a time we can only send 1 body either text OR html
            html: `<p>Dear, ${user.userName} your password reset link is : </p>
            <h4>${forgetPasswordLink}</h4>                    
            `, // HTML body
        });

        res.status(200).json({ msg: "Check email for Reset password ! " })


    } catch (error) {

        res.status(500).json({ msg: "Server error at Forget Password ! " })

    }

})

// reset Password
authRouter.post('/reset-password', async (req, res) => {    
    const { token } = req.query;
    const { newPassword } = req.body;

    try {

        var decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (decoded) {

            const userId = decoded.userId;

            const user = await AuthModel.findById(userId);

           const hash = await  bcrypt.hash(newPassword, saltRounds)

            user.password = hash;

            await user.save();

            res.status(200).json({msg : `${user.userName} your password successfully Reset ! `})

        } else {
            res.status(403).json({ msg: "Invalid JWT Token ! " })
        }


    } catch (error) {

        res.status(500).json({ msg: "Server error at reset password route", error })

    }

    res.status(200).json({ token })
})


module.exports = authRouter;
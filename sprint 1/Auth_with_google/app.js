
const express = require('express');
const connectDataBase = require('./configs/db.config');
require('dotenv').config();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session')



const app = express();

app.use(express.json());   // JSON Body parser in-build middleware

connectDataBase();     // Data Base connection function

const PORT = process.env.PORT || 3000;

 
 //  -----------------------  google login            ----------------------------------------
app.use(
    session({
        // A secret key to keep the session safe.
        secret: "secret",

        // Don't save the session again if nothing changed.
        resave: false,

        // Create and save a session for every new user,
        // even if it's empty.
        saveUninitialized: true
    })
);

app.use(passport.initialize()); //  initialize passport
app.use(passport.session());  // when user login then create section




passport.use(new GoogleStrategy({                   //   It work as middleware  and return the profile if person already user of google
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // console.log(profile)
        return done(null, profile);        ///  done == next()  and profile return req.user as we send from authMiddleware
    }
));


app.get('/auth/google',           //    It calls google login / authorization page    
  passport.authenticate('google', { scope: ['profile', 'email'] }));


  app.get('/auth/google/callback',           // it is  Callback route in case of Login Success Or Failure
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
      console.log("Id : " + req.user.id);
      console.log("Name : " + req.user.displayName);;
      console.log("Email : " + req.user.emails[0].value)
        // Successful authentication, redirect home.
        // res.redirect('/');
    res.redirect('/profile');
  });


//  ==========================================================================


app.get('/login', (req, res) => {
    res.json({ msg: "Please login again ......." })
});


app.get('/', (req, res) => {
   
    res.send("<a href='/auth/google'>Login with google</a>")
});

// Profile route
app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/login");

  res.json({ hii: req.user.displayName, id : req.user.id});
});


app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})


//  ---------------------------------------------------------------



passport.serializeUser((user, done) => done(null, user));  // save user data inside the session
passport.deserializeUser((user, done) => done(null, user))   // retrieve user data from the session when is needed


app.listen(PORT, () => {
    console.log(`Server start on PORT ${PORT}`)
});
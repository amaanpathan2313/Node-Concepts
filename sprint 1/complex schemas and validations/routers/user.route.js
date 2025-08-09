
const express = require('express');
const userModel = require('../models/usersModel');

const userRouter = express.Router();


userRouter.post('/user', async (req, res) => {
    const newUser = req.body;

    try {

        await userModel.create(newUser);
        res.status(201).json({ msg: `User added successfully `, newUser })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })

    }
})


//  female less then age 30

userRouter.get('/analytic/flt30', async (req, res) => {
    let users = await userModel.find({ $and: [{ gender: "female" }, { age: { $lte: 30 } }] }, { name: 1, age: 1, gender: 1 });
//                        $ and : it take array of conditions
    res.json({users})
})

// users from maharashtra and delhi

userRouter.get('/analytic/f', async (req, res) => {
    let users = await userModel.find({"address.state" : {$in:["maharashtra", "delhi"]}});
//                                                    $in find in array
    res.json({users})
})

module.exports = userRouter;
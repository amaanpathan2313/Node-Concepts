

const express = require('express');
const UserModel = require('../models/userModel');

const userRouter = express.Router();


//  get all documents
userRouter.get('/users', async (req, res) => {

    try {
        const users = await UserModel.find({}); //  it retrieve all documents from user collection
        // console.log(users)
        res.json({ msg: "All users", users })
    } catch (error) {
        // console.log(err);
        res.json({ msg: "No users are found !" })
    }

})

// add new user into DataBase
userRouter.post('/add-user', async (req, res) => {
    const newUser = req.body;
    // console.log(newUser);
    await UserModel.create(newUser)

    res.status(201).json({ msg: "New user added into system !", newUser })
})

userRouter.patch('/update-user/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;


    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ msg: `User with ID ${id} not found in database.` });
        }


        await UserModel.findByIdAndUpdate(id, updatedData)
        res.status(200).json({ msg: "User data updated successfully !", updatedData });

    } catch (error) {
        res.status(404).json({ msg: `Id : ${id} some issue occur when update user data` })
    }

})

userRouter.delete('/delete-user/:id', async (req, res) => {
    const id = req.params.id;
   
    try {

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ msg: `User with ID ${id} not found in database.` });
        }

        await UserModel.findByIdAndDelete(id)

        res.status(200).json({ msg: "User deleted successfully" })

    } catch (error) {

        res.status(404).json({ msg: "Some issue occur when deleting data !" })

    }
})


module.exports = userRouter;
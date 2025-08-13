
const express = require('express');
const BookModel = require('../models/bookModel');
const UserModel = require('../models/userModel');

const userRouter = express.Router();


// Add Member (POST /add-member):
// Add a new member with name and email.

userRouter.post('/add-user',async (req, res) => {
    const newUser = req.body;
console.log(newUser)
    try {
        await UserModel.create(newUser);
        res.status(201).json({ msg: "User added !" , newUser})
    } catch (error) {
        res.status(500).json({ msg: "Internal Server error !", error })
    }
})



// Get Member Borrowed Books (GET /member-borrowed-books/:memberId):
// Retrieve all books a member has borrowed using .populate().

userRouter.get('/user-rentals/:userId', async (req, res) => {
    const {userId} = req.params;

    const targetUser = await UserModel.findById(userId);
    let rentedBooks = [];


    try {
        
         const bookArray = targetUser.rentedBooks;
        
       
        
        for(let ele of bookArray){
            let book = await BookModel.findById(ele);
            rentedBooks.push(book);
        }
        
       
        res.status(200).json({user : targetUser, rentedBooks : rentedBooks  })
        
    } catch (error) {
        
        res.status(500).json({msg : "Server Issue", error})

    }
})


module.exports = userRouter;
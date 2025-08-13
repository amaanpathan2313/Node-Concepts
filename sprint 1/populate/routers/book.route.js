const BookModel = require("../models/bookModel");

const express = require('express');
const UserModel = require("../models/userModel");

const bookRouter = express.Router();


// Add Book (POST /add-book):
// Create a new book with title, author, and default status set to available.
bookRouter.post('/add-book', async (req, res) => {
    const newBook = req.body;

    try {
        await BookModel.create(newBook);

        res.status(201).json({ msg: "New Book add to collection !" })

    } catch (error) {

        res.status(500).json({ msg: "Server Issue", error })

    }
})


// Borrow Book (POST /borrow-book):
// Borrow a book, updating the book’s status to borrowed and adding the member to borrowers.

bookRouter.post('/rent-book', async (req, res) => {
    const { title } = req.query;
    const { userId } = req.body;

    const targetBook = await BookModel.findOne({ title });
    const targetUser = await UserModel.findById(userId);

    try {

        if (!targetBook) {
            res.status(404).json({ msg: "Book not found !" })
        }
        if (!targetUser) {
            res.status(404).json({ msg: "User not found !" })
        }


        targetBook.rentedBy.push(userId)
        await targetBook.save();

        targetUser.rentedBooks.push(targetBook.id)
        await targetUser.save();


        res.status(201).json({ msg: `${title} book rented by ${targetUser.name} !` })

    } catch (error) {

        res.status(500).json({ msg: "Server Issue", error })

    }
})

// Add the book to the member’s borrowedBooks list.
// Return Book (POST /return-book):
// Return a borrowed book, updating the status to available and removing the member from borrowers.
// Remove the book from the member’s borrowedBooks list.

bookRouter.post('/return-book', async (req, res) => {
    const { title, userId } = req.body;

    const targetBook = await BookModel.findOne({ title });
    const targetUser = await UserModel.findById(userId);

    try {

        if (!targetBook) {
            res.status(404).json({ msg: "Book not found !" })
        }
        if (!targetUser) {
            res.status(404).json({ msg: "User not found !" })
        }


        targetBook.rentedBy = targetBook.rentedBy.filter((ele) => ele != userId)
        await targetBook.save();

        targetUser.rentedBooks = targetUser.rentedBooks.filter((ele) => ele != targetBook.id)
        await targetUser.save();



        res.status(200).json({ msg: `${title} book return by ${targetUser.name} !` })

    } catch (error) {

        res.status(500).json({ msg: "Server Issue", error })

    }
})


// Get Book Renters (GET /book-renters/:bookId):
// Retrieve all users who rented a specific book using .populate().

bookRouter.get('/book-renters/:bookId', async (req, res) => {
    const {bookId} = req.params;

    try {
        
            let data = await BookModel.findById(bookId).populate('rentedBy', 'name email');

            res.status(200).json({data})

    } catch (error) {

        res.status(500).json({msg : "Server Error", error})
        
    }
})


// Update Book Details (PUT /update-book/:bookId):
// Update book information, including title and author.
bookRouter.put('/update-book/:bookId', async (req, res) => {
    const {bookId} = req.params;
    const updateData = req.body;

    try {
        
            let data = await BookModel.findByIdAndUpdate(bookId, updateData) 

            res.status(200).json({msg : "Book data update successfully ! "})

    } catch (error) {

        res.status(500).json({msg : "Server Error", error})
        
    }
})


// Delete Book (DELETE /delete-book/:bookId):
// Delete a book and remove it from all members' borrowedBooks lists.

bookRouter.delete('/delete-book/:bookId' , async (req, res) => {
    const { bookId } = req.params;

    let b = await BookModel.findById(bookId);

    if(!b){
        res.status(404).json({msg : "Book not found !"})
    }
    
                   
    try {
        await UserModel.deleteMany({rentedBooks : bookId}) 
        await BookModel.findByIdAndDelete(bookId) 
    
        res.status(200).json({msg : "Deleted"})

    } catch (error) {
        

        res.status(500).json({msg : "Internal server error", error})

    }
})

 


module.exports = bookRouter;








 

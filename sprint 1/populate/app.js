const express = require('express');
const connectDataBase = require('./configs/db.config');
const bookRouter = require('./routers/book.route');
const userRouter = require('./routers/user.route');

const app = express();

connectDataBase();

app.use(express.json());

app.use('/users', userRouter);

app.use('/books', bookRouter);

app.listen(3000, () => {
    console.log("Server start on port 3000")
})
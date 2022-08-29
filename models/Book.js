const mongoose = require("../config/db")

var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
var Book = mongoose.model('Book', BookSchema, "books"); //MODEL

module.exports = Book

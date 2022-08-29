//npm module imports

var express = require('express');
var app = express();
const helmet = require("helmet")
const morgan = require("morgan")
const cookieparser = require("cookie-parser")


//application module and file import
const BookRoute = require("./routes/BookRoute")
const jwt = require("./libs/jwt")

//const cors=require("cors");

//built in/tp middleware

//app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("combined"))
app.use(cookieparser())


//applicarion mw inc
app.get("/getkey",jwt.sign)
app.use("/books", BookRoute)


app.listen(8000);

//change with app.post app.get . test with postman
// make another application with model route and controller separate
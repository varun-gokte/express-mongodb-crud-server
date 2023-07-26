const express = require("express");
const app = express();

const path = require("path");
const port = 3000;

const mongoose = require("mongoose");
const Movie = require("./Movie");

const editRoute = require("./routes/edit.js");
const readRoute = require("./routes/read.js");

//Making a connection to a database called credence_assgn
mongoose.connect(
  "mongodb://127.0.0.1:27017/credence_assgn",
  console.log("MongoDB Connected")
);

//The following two lines are used to make sure that the JSON in the request body is read properly
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//For readability the routes have been split into two files:
//in edit.js, all the routes that make changes to the database have been placed: Create, Update and Delete
app.use("/edit", editRoute);

//in read.js, the routes that read data from the database and display it have been placed: Read
app.use("/list", readRoute);

app.listen(port, () => console.log("The server is running at port " + port));

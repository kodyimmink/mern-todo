//Environment config
require('dotenv').config();

//Server setup
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const connection  = mongoose.connection;
const dbUri = process.env.ATLAS_URI;

//Routes
const todoRouter = require('./routes/todo.routes.js');

//Middleware
app.use(cors());
app.use(express.json());

//Route usage
app.use('/todo', todoRouter);

//Connect to Database
mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
});

//Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
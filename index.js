const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config()
const signupRoute = require('./Routes/signupRoute')
const loginRoute = require('./Routes/loginRoute')
const userModel = require('./dbModels/userModel')
const downloadRoute = require('./Routes/downloadRoute')
const commentRoutes = require('./Routes/commentRoute')

//Connecting to the Database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to DB")
});

//Server Initialisation
const app = express();

//Middlewares
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});
app.use(express.static('/public/build'))

//Imported Routes
app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/', downloadRoute);
app.use('/', commentRoutes);
//Default Routes
app.get('/default', (req, res) => {
    res.send(JSON.stringify({ success: true, code: 200, response: { message: "Server Up and Running" } }));
});








//Listening to the Server
app.listen(process.env.PORT || 7000);
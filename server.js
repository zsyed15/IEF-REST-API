const MONGO_URI = "mongodb+srv://donut:donut@cluster0.qtom342.mongodb.net/loginGameDatabase";
const port = 13756;
const express = require('express');
// const password = "donut"
// const username = "donut";
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
///set up database models 
require('./model/Account');
require('./model/Stock');
//setup routes
require('./Routes/authenticationRoutes')(app); 
//const Account = mongoose.model('accounts');
//Routes


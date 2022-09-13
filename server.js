const MONGO_URI = DB_URI;
const port = 13756;
const express = require('express');

const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
///set up database models 
require('./model/Account');
require('./model/Stock');
require('./model/SaveData')
require('./model/Crypto')
// require('./model/SaveData');
//setup routes
require('./Routes/authenticationRoutes')(app); 
//const Account = mongoose.model('accounts');
//Routes


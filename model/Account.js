const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountScehema = new Schema({
    username: String,
    password: String,
    // saveData : String,
    lastAuthentication: Date,
     salt: String,
    testjson: Object
});
mongoose.model('accounts',accountScehema);
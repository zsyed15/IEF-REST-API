const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountScehema = new Schema({
    username: String,
    password: String,
    // saveData : String,
    lastAuthentication: Date,
    testjson: Object
});
mongoose.model('accounts',accountScehema);
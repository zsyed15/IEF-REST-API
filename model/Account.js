const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountScehema = new Schema({
    username: String,
    password: String,
    // saveData : String,
    lastAuthentication: Date,
});
mongoose.model('accounts',accountScehema);
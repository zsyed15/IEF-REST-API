const mongoose = require('mongoose');
const {Schema} = mongoose;

const stockScehema = new Schema({
    "Name": String,
    "Global Quote": Object
});
mongoose.model('stocks',stockScehema);

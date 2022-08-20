const mongoose = require('mongoose');
const {Schema} = mongoose;

const stockScehema = new Schema({
    "Name": String,
    "Global Quote": Object
    // '01. symbol': String,
    // '02. open': String,
    // '03. high': String,
    // '04. low': String,
    // '05. price': String,
    // '06. volume': String,
    // '07. latest trading day': String,
    // '08. previous close': String,
    // '09. change': String,
    // '10. change percent': String
    // saveData : String,
});
mongoose.model('stocks',stockScehema);

const mongoose = require('mongoose');
const {Schema} = mongoose;

const cryptoScehema = new Schema({
    "Name": String,
    "CryptoData": Object
});
mongoose.model('cryptos',cryptoScehema);

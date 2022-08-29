const mongoose = require('mongoose');
const {Schema} = mongoose;

const saveDataScehema = new Schema({
    // playerID: String,
    // email: String,
    username: String,
    serializedJson: Object
}
,{minimize:false});
mongoose.model('savedata',saveDataScehema);
// {
//     username: String,
//     ownedStocks: Object,
//     ownedCrypto: Object,
//     balance : Number,
//     transactionHistory: [{
//         transactionType: String,
//         action: String, 
//         itemName: String,
//         quantity: Number,
//         price: Number,
//         transactionDate: Date
//     }]
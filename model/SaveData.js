const mongoose = require('mongoose');
const {Schema} = mongoose;

const saveDataScehema = new Schema({
    username: String,
    serializedJson: Object
},
{minimize:false});
mongoose.model('savedata',saveDataScehema);

const MONGO_URI = DB_URI;
var axios = require('axios');
const mongoose = require('mongoose')
require('../model/Crypto');
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const Crypto = mongoose.model('cryptos');
const fs =  require('fs');
const ERROR_MESSAGE = `'Error Message': 'Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for DIGITAL_CURRENCY_DAILY.`;

async function  updateCrypto(symbol){
    
    //Accoutns for edge case with splitting crypto.txt
    cryptoSymbol = null;
    if(symbol.includes("-USD")){
        cryptoSymbol = symbol.slice(0,-4);
        console.log("HEREE");
    }
    else{
        cryptoSymbol = symbol;
    }

    let cryptoURL = CRYPTO_URL;
    let res = await axios.get(cryptoURL);
    //console.log(res)
    //console.log('here')
    if(res.data == undefined || res.data == null){
        return;
    }
    let latestKey = Object.keys(res.data["Time Series (Digital Currency Daily)"])[0];
    let latestData = res.data["Time Series (Digital Currency Daily)"][latestKey];

    let cryptoName = cryptoSymbol.toUpperCase();
    const {"4a. close (USD)":price,'5. volume':volume,'6. market cap (USD)':marketcap} = latestData;
    let condensedData = {
        'Name': cryptoName,
        'Price': price,
        'Volume': volume,
        'MarketCap':marketcap
    }

    let filter = {Name:cryptoName};
    let options = {upsert:true};

    let newCrypto = new Crypto({
        Name : condensedData.Name,
        CryptoData : condensedData
    });

    let updateCryptoEntry =  await Crypto.updateOne(filter,{$set :{"Name": newCrypto.Name,"CryptoData": newCrypto.CryptoData}},options);
    console.log(cryptoName)
}
async function asyncrun(){
    const contents = fs.readFileSync('./crypto.txt', 'utf-8');
    const arr = contents.split(',');
    let lastelem = arr.length - 1;
    arr[lastelem] = arr[lastelem].replace(/(\r\n|\n|\r)/gm, "");
    console.log(arr);
    
    }
    
    asyncrun();

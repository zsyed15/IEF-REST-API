const MONGO_URI = "mongodb+srv://donut:donut@cluster0.qtom342.mongodb.net/loginGameDatabase";
var axios = require('axios');
const mongoose = require('mongoose')
require('./model/Crypto');
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const Crypto = mongoose.model('cryptos');
const fs =  require('fs');
const ERROR_MESSAGE = `'Error Message': 'Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for DIGITAL_CURRENCY_DAILY.`;
//3NI4WNPDVIQG9RPM
//5SO0PDYFZVGM2FC4
async function  updateCrypto(symbol){
    
    //Accoutns for edge case with splitting crypto.txt
    cryptoSymbol = null;
    if(symbol.includes("-USD")){
        cryptoSymbol = symbol.slice(0,-4);
        console.log("HEREE")
    }
    else{
        cryptoSymbol = symbol;
    }

    let cryptoURL = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${cryptoSymbol}&market=USD&apikey=3NI4WNPDVIQG9RPM`;

    let res = await axios.get(cryptoURL)
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
async function asrun(){
    const contents = fs.readFileSync('./crypto.txt', 'utf-8');
    const arr = contents.split(',');
    let lastelem = arr.length - 1;
    arr[lastelem] = arr[lastelem].replace(/(\r\n|\n|\r)/gm, "");
    console.log(arr)
    
    // //Iterate through list of crypto
    // for (i = 0; i < arr.length;i++){
    //   //pause every 5 iterations to account for crypto api rate limiting (5requests/minute).
    //   if(i != 0 && i%5 == 0){
    //   await new Promise(resolve => setTimeout(resolve,60000))
    //   }

    //   let x = await updateCrypto(arr[i]);
     
    //   }
    }
    
    asrun();

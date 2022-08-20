const MONGO_URI = "mongodb+srv://donut:donut@cluster0.qtom342.mongodb.net/loginGameDatabase";
var axios = require('axios');
const mongoose = require('mongoose')
require('./model/Stock');
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const Stock = mongoose.model('stocks');
const fs =  require('fs');

async function  updateStock(symbol){

  let stockUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=5SO0PDYFZVGM2FC4`
 
  let res = await axios.get(stockUrl)
  //extracting relevant fields from response 
    let stockName = res.data["Global Quote"]["01. symbol"]
    let stockData = res.data["Global Quote"]
    
    //parameters for MongoDB query 
    let filter = {Name:stockName};
    let options = {upsert:true};
   
    //create new stock to add 
    let newStock = new Stock({        
      "Name": stockName,
     "Global Quote": stockData
    });

    let updateStockEntry =  await Stock.updateOne(filter,{$set :{"Name": newStock.Name,"Global Quote": newStock["Global Quote"]}},options);

    console.log(newStock.Name);
  

}  
//Updates all stocks that are in predefined list @ ./testarr.txt
async function asrun(){
const contents = fs.readFileSync('./stocks.txt', 'utf-8');

const arr = contents.split(',');
console.log(arr)

//Iterate through list of stocks
for (i = 0; i < arr.length;i++){
  
  //pause every 5 iterations to account for stock api rate limiting (5requests/minute).
  if(i != 0 && i%5 == 0){
  await new Promise(resolve => setTimeout(resolve,60000))
  }
  
  let x = await updateStock(arr[i]);
 
  }
}

asrun();




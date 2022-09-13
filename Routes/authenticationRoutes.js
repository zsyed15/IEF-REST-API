const port = 13756;

const mongoose = require("mongoose");
const Stock = mongoose.model("stocks");
const Account = mongoose.model("accounts");
const SaveData = mongoose.model("savedata");
const Crypto = mongoose.model("cryptos");

const bcrypt = require('bcrypt');
const cryptoAuth = require('crypto')

module.exports = (app) => {
  //Routes
  app.post("/account/login", async (req, res) => {

    const { rusername, rpassword } = req.body;
    
    if (rusername == null || rpassword == null) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    let userAccount = await Account.findOne({ username: rusername });
    console.log(userAccount);
    
    if (userAccount != null) {
      bcrypt.compare(rpassword,userAccount.password).then(async (result) =>{
          if(result){
          console.log('aaaaaaaaaaa')
          userAccount.lastAuthentication = Date.now();
          await userAccount.save();
          res.send(userAccount);
          console.log("account exists, fetching")
          return;
        }
        else{
          res.status(401).json({ error: "Invalid Credentials" });
          return;
        }
      })
    }
    else{
        res.status(401).json({ error: "Invalid Credentials" });
        return;
    }
  });


  app.post("/account/create", async (req, res) => {
    
    console.log(req.body);
    const { rusername, rpassword } = req.body;
    
    if (rusername == null || rpassword == null) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    let userAccount = await Account.findOne({ username: rusername });
    console.log(userAccount);
    
    if (userAccount == null) {
      //create new account
      bcrypt.hash(rpassword,10,async (err,hash) =>{
        let newAccount = new Account({
        username: rusername,
        password: hash,
        lastAuthentication: Date.now(),
      });
      
      await newAccount.save();
      res.send(newAccount);
      return;
      })


    } 
    else {
        res.status(409).json({ error: "Username is taken" });
        //res.status(401).json({error: "Invalid Credentials"});
    }
    return;
  });

  app.get("/stocks/:stockname", async (req, res) => {
    let stockname = req.params.stockname.toUpperCase();
    console.log("sssssss");
    
    const projection = { "Global Quote": true, _id: false };
    let retrievedStock = await Stock.findOne({ Name: stockname }, projection);
    
    if (retrievedStock != null) {
      res.json(retrievedStock);
      //console.log(retrievedStock)
    } 
    else {
      res.status(404).send("Stock not found");
    }
  });
  
  app.post("/account/data", async (req, res) => {
    //send playerID and serialized json as 2 fields
    //check if exists, if exists then update existing one with values given in post by username query
    // if it doesnt exist, create new with values given in post
    const { rusername, serializedData } = req.body;
    let filter = { username: req.body.username };
    let options = { upsert: true };
    let newObj = { serializedJson: JSON.parse(serializedData) };
    // console.log(newObj)
    let updateDB = await SaveData.updateOne(
      filter,
      {
        //TODO: set 
        $set: {
          username: rusername,
          serializedJson: JSON.parse(serializedData)
},
      },
      options
    );
    
    console.log("posted");
    res.send(serializedData);
  
});
  
app.get("/account/data/:username", async (req, res) => {
    let accName = req.params.username.toLowerCase();
    let userData = await SaveData.findOne({ username: accName });
    //await SaveData.findOne({username: rusername});
    const { serializedJson: data } = userData;
    
    if (userData != null) {
      console.log(data);
      res.send(data);
      //or res.send(data)
    } 
    else {
      res.status(404).send("Account not found");
    }
  });

  app.get("/crypto/:cryptoname", async (req, res) => {
    let cryptoname = req.params.cryptoname.toUpperCase();
    console.log("sssssss");
    
    const projection = { CryptoData: true, _id: false };
    let retrievedCrypto = await Crypto.findOne(
      { Name: cryptoname },
      projection
    );
    
    if (retrievedCrypto != null) {
      res.json(retrievedCrypto);
      //console.log(retrievedStock)
    } 
    else {
      res.status(404).send("Stock not found");
    }
  });

  
  app.listen(port, () => {
    console.log("Listening on " + port);
  });

};

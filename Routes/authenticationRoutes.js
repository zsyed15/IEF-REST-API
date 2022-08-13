const MONGO_URI = "mongodb+srv://donut:donut@cluster0.qtom342.mongodb.net/loginGameDatabase";
const port = 13756;
const express = require('express');
const password = "donut"
const username = "donut";
const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
module.exports = app => {

 
//Routes
app.post('/account/login',async (req,res)=>{
    //console.log(req.body)
    const {rusername,rpassword} = req.body;
   if (rusername == null || rpassword == null){
    res.status(401).json({error: "Invalid Credentials"});
    return;
   } 

   let userAccount = await Account.findOne({username: rusername});
   console.log(userAccount)
   if(userAccount != null){

    if(rpassword == userAccount.password){
        userAccount.lastAuthentication = Date.now();
        await userAccount.save();
        res.send(userAccount); 
        console.log('account exists, fetching')
        return;
    }
}
        res.status(401).json({error: "Invalid Credentials"});
        return;
});

app.post('/account/create',async (req,res)=>{
    console.log(req.body)
    const {rusername,rpassword} = req.body;
   if (rusername == null || rpassword == null){
    res.status(401).json({error: "Please enter a valid username nad password"});
    return;
   } 

   let userAccount = await Account.findOne({username: rusername});
   console.log(userAccount)
   if(userAccount == null){
    //create new account
    console.log('creating new account');
    let newAccount = new Account({
        username: rusername,
        password: rpassword,
        lastAuthentication: Date.now()
    });
    await newAccount.save();
    res.send(newAccount);
    return;
   }
   else{
        res.status(409).json({error:"Username is taken"});
        //res.status(401).json({error: "Invalid Credentials"});
    
   }
   return;
});

app.listen(port, ()=>{
    console.log("Listening on " + port);
})
}
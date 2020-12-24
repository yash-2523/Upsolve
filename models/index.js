var mongoose = require('mongoose');

var url = "mongodb+srv://admin:admin@cluster0.hxyw2.mongodb.net/Upsolve?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err)=>{
    if(!err){
        console.log("Database Connected Successfully...");
    }else{
        console.log("Error in Database Connection...");
        console.log(err);
    }
});

require('./user.model');
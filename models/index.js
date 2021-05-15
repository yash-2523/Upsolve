var mongoose = require('mongoose');

var url = process.env.MongoUrl

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err)=>{
    if(!err){
        console.log("Database Connected Successfully...");
    }else{
        console.log("Error in Database Connection...");
        console.log(err);
    }
});

require('./user.model');
require('./Problem.model');
require('./feedback.model');
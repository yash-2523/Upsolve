var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const Feedback = mongoose.model('feedback');


app.post('/add',(req,res) => {
    const feedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        feedback: req.body.feedback,
    });
    feedback.save().then(doc => {
        if(!doc){
            res.json(false);
        }
        else{
            res.json(true);
        }
    })
})

module.exports = app;
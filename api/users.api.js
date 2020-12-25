var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');

app.post('/register', (req, res)=>{
    var usr = new User(req.body);
    bcrypt.hash(usr.password, 9).then((hash)=>{
        usr.password = hash;
        usr.save().then((doc)=>{
            res.json({status: true, doc});
        }).catch((error)=>{
            console.log(error);
            res.json({status: false, error: "Database Error Ouccered"});
        })
    }).catch((error)=>{
        console.log(error);
        res.json({status: false, error: "Internal Server Error"});
    })
})

app.post('/login', (req, res)=>{
    User.findOne({username: req.body.username}).then((doc)=>{
        if(doc){
            bcrypt.compare(req.body.password, doc.password).then((check)=>{
                if(check){
                    var payload = {
                        username: req.body.username,
                        _id: doc._id
                    }
                    var token = jwt.sign(payload, "1234");
                    res.json({status: true, token});
                }else{
                    res.json({status: false, error: "Username Password Doesn't Match..."});
                }
            })
        }else{
            res.json({status: false, error: "Username Password Doesn't Match..."});
        }
    })
})

app.get('/profile', (req, res)=>{
    var decoded = jwt.verify(req.headers.authorization, "1234");
    User.findById(decoded._id).then((doc)=>{
        res.json(doc);
    })
})

app.get('/list',(req,res)=>{
    User.find({},'username email').then((doc)=>{
        res.json({status:true, data: doc});
    }).catch(err => {
        res.json({status:false});
        console.log(err);
    })
})

module.exports = app;
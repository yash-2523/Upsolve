var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');

app.post('/register', (req, res)=>{
    var usr = new User(req.body);
    console.log(req.body);
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
    User.findOne({username: { $regex: new RegExp("^" + req.body.username.toLowerCase(), "i") }}).then((doc)=>{
        if(doc){
            bcrypt.compare(req.body.password, doc.password).then((check)=>{
                if(check){
                    var payload = {
                        username: req.body.username,
                        _id: doc._id,
                        streak: doc.streak,
                        dailyQuestion: doc.dailyQuestion,
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
app.get('/getUser/:id',(req,res)=>{
    User.findById(req.params.id,'dailyQuestion UpsolveQuestion').then((user)=>{res.json(user)}).catch(err => {res.json(false)});
})
app.get('/getUserByname/:username',(req,res)=>{
    User.findOne({username: { $regex: new RegExp("^" + req.params.username.toLowerCase(), "i") }}).then((user)=>{res.json(user)}).catch(err => {res.json(false)});
})
app.get('/updateData',(req,res) => {
    User.updateMany({dailyQuestion: false},{
        $set:{
            streak: 0
        }
    }).then((result,err) => {console.log(result)});
    User.updateMany({},{
        $set:{
            dailyQuestion: false,
            UpsolveQuestion: 0
        }
    }).then((result,err) => {console.log(result)});
    res.json(true)
})
app.get('/list',(req,res)=>{
    
    if(req.query.country == "any"){
        req.query.country = "";
        req.query.institution = "";
    }
    User.find({$and: [{username: {"$regex":req.query.username || ".*","$options": "i"}},{country: {"$regex":req.query.country || ".*","$options": "i"}},{institution: {"$regex":req.query.institution || ".*","$options": "i"}}]},'username email streak',{skip: parseInt(req.query.skip) || 0,limit: parseInt(req.query.limit) || 2, sort: {streak: -1}}).then((doc)=>{
        User.count({$and: [{username: {"$regex":req.query.username || ".*","$options": "i"}},{country: {"$regex":req.query.country || ".*","$options": "i"}},{institution: {"$regex":req.query.institution || ".*","$options": "i"}}]}).then((count) => {res.json({status:true, data: doc,count})});
        
    }).catch(err => {
        res.json({status:false});
        console.log(err);
    })
})

module.exports = app;
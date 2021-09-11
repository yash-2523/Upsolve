var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');

let RefreshData = schedule.scheduleJob("00 30 18 * * *",() => {
    var now = new Date();
    // convert date to a string in UTC timezone format:
    console.log(now.toUTCString());
    UpdateData();
})

app.post('/register', (req, res)=>{
    req.body.username = req.body.username.toLowerCase();
    var usr = new User(req.body);
    
    bcrypt.hash(usr.password, 9).then((hash)=>{
        usr.password = hash;
        usr.save().then((doc)=>{
            var payload = {
                username: doc.username,
                _id: doc._id,
                streak: doc.streak,
                dailyQuestion: doc.dailyQuestion,
            }
            var token = jwt.sign(payload, process.env.jwtToken);
            res.json({status: true, doc,token});
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
    User.findOne({username: req.body.username.toLowerCase()}).then((doc)=>{
        if(doc){
            bcrypt.compare(req.body.password, doc.password).then((check)=>{
                if(check){
                    var payload = {
                        username: req.body.username,
                        _id: doc._id,
                        streak: doc.streak,
                        dailyQuestion: doc.dailyQuestion,
                    }
                    var token = jwt.sign(payload, process.env.jwtToken);
                    
                    res.json({status: true, token});
                }else{
                    res.json({status: false, error: "Username Password Doesn't Match..."});
                }
            })
        }else{
            res.json({status: false, error: "Username Password Doesn't Match..."});
        }
    }).catch((err) => {return false})
})

app.post('/updateuser',(req,res)=>{
    const user = req.body;
    User.updateOne({username: user.username},{
        $set:{
            name: user.name,
            country: user.country,
            institution: user.institution,
            bio: user.bio
        }
    }).then(res => res.json()).then((result,err)=> {res.json(result)}).catch(err => {res.json(false)});
})

app.post('/check_user',(req,res) => {
    User.findOne({username: req.body.username.toLowerCase()}).then((doc)=>{
        if(doc){
            res.json({
                status: true,
            })
        }
        else{
            res.json({
                status: false,
                error: "User Does not Exist"
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            error: "User Does not Exist"
        })
    })
})

app.post('/update_password',(req,res) => {
    bcrypt.hash(req.body.password, 9).then((hash)=>{
        User.updateOne({username: req.body.username.toLowerCase()},{
            $set: {
                password: hash
            }
        }).then((result,err)=> {
            if(result){
                res.json(true)
            }else{
                res.json(false)
            }
            
        }).catch(err => {console.log(err);res.json(false)});
    }).catch((error)=>{
        console.log(error);
        res.json({status: false, error: "Internal Server Error"});
    })
    
})

app.get('/profile', (req, res)=>{
    var decoded = jwt.verify(req.headers.authorization, process.env.jwtToken);
    User.findById(decoded._id).then((doc)=>{
        res.json(doc);
    })
})
app.get('/getUser/:id',(req,res)=>{
    User.findById(req.params.id,'dailyQuestion UpsolveQuestion').then((user)=>{res.json(user)}).catch(err => {res.json(false)});
})
app.get('/getUserByname/:username',(req,res)=>{
    User.findOne({username: req.params.username.toLowerCase()}).then((user)=>{res.json(user)}).catch(err => {res.json(false)});
})
async function UpdateData() {
    

    await User.updateMany({dailyQuestion: false},{
        $set:{
            streak: 0
        }
    }).then((result,err) => {});
    await User.updateMany({},{
        $set:{
            dailyQuestion: false,
            UpsolveQuestion: 0
        }
    }).then((result,err) => {});
    
}
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
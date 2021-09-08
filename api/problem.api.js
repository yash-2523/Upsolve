var express = require('express');
var app = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const Problem = mongoose.model('problem');
const schedule = require('node-schedule');

let RefreshData = schedule.scheduleJob("00 00 00 * * *",() => {
    RefillData();
})

RefillData();

function RefillData() {
    

    fetch("https://codeforces.com/api/problemset.problems").then(res=>res.json()).then((data)=>{
        if(data.status == "OK"){
            Problem.find({}).sort({'contestId': -1}).limit(1).lean().then(docs => {
                var latest = docs[0].contestId;
                var problems = data.result.problems.filter(el => {
                    if(el.contestId > latest){
                        return true;
                    }
                    return false;
                });
                var final = problems.map(el => {
                    el.hash = el.name+el.contestId+el.index;
                    return el;
                });
                Problem.insertMany(final);
            })   
        }
    })
}

app.get('/list',(req,res)=>{
    Problem.find({},'name ratings tags contestId index',{skip: parseInt(req.query.skip) || 0,limit: parseInt(req.query.limit) || 10}).then((doc)=>{
        Problem.count().then((count) => {res.json({status:true, data: doc,count})});        
    }).catch(err => {
        res.json({status:false});
        console.log(err);
    })
})

async function findAndFilter(solved, ratingStart,ratingEnd){
    return Problem.find({rating: {$gte: ratingStart, $lte: ratingEnd}}).lean().then((docs)=>{
        const dc=[]
        for(let i = 0; i < docs.length; i++){
            let el = docs[i];
            delete el.hash;
            if(!solved.get(el.name)){
                dc.push(el);
                break;
            }
        }
        dc[0].link =`https://codeforces.com/problemset/problem/${dc[0].contestId}/${dc[0].index}`;
        return (dc ? dc[0] : "invalid");
    })
}

app.get('/upsolve/:username', (req,res)=>{
    let solved = null;
    User.findOne({username: req.params.username.toLowerCase()}).populate('upsolve_Que').then((usr) => {
        
        fetch("https://codeforces.com/api/user.status?handle="+req.params.username).then(res=>res.json()).then(async (data)=>{
            solved = new Map();
            data.result.forEach((el,i)=>{
                if(el.verdict==="OK"){
                    
                    solved.set(el.problem.name,true);
                }
            });
            if(!usr.upsolve_Que || (usr.upsolve_Que && solved.get(usr.upsolve_Que.name))){
                // Check That Question :)
                // Here
                if(usr.upsolve_Que){
                    await CheckQuestion({query: {username: usr.username, contestId: usr.upsolve_Que.contestId, index: usr.upsolve_Que.index, name: usr.upsolve_Que.name}, params: {type: "upsolve"}});
                }
                fetch("https://codeforces.com/api/user.rating?handle="+req.params.username).then(res => res.json()).then(async (rates)=>{
                    let rating = rates.result[rates.result.length-1].newRating || 800;
                    if(rating < 800){
                        rating = 800;
                    }
                    if(rating >= 2700){
                        rating = 2300;
                    }
                    let ratingStart = rating+200,ratingEnd = rating+400;
                    let prob = await findAndFilter(solved,  ratingStart,ratingEnd);
                    usr.upsolve_Que = prob._id;
                    usr.save();
                    res.json(prob);
                }).catch(async (err) => {
                    let rating = 800;
                    let ratingStart = rating+200,ratingEnd = rating+400;
                    let prob = await findAndFilter(solved, ratingStart,ratingEnd);
                    usr.upsolve_Que = prob._id;
                    usr.save();
                    res.json(prob);
                });
            }else{
                var dc = JSON.parse(JSON.stringify(usr.upsolve_Que));
                dc.link = `https://codeforces.com/problemset/problem/${dc.contestId}/${dc.index}`;
                res.json(dc);
            }
        }).catch(err => {console.log(err); res.json(false)});
    });
})

app.get('/dailyques/:username', (req,res)=>{
    let solved = null;
    User.findOne({username: req.params.username.toLowerCase()}).populate('daily_Que').then((usr) => {
        
        fetch("https://codeforces.com/api/user.status?handle="+req.params.username).then(res => res.json()).then(async (data)=>{
            solved = new Map();
            data.result.forEach((el,i)=>{
                if(el.verdict==="OK"){
                    
                    solved.set(el.problem.name,true);
                }
            });
            if(!usr.daily_Que || (usr.daily_Que && solved.get(usr.daily_Que))){
                // Check for problem
                // Here
                if(usr.daily_Que){
                    await CheckQuestion({query: {username: usr.username, contestId: usr.daily_Que.contestId, index: usr.daily_Que.index, name: usr.daily_Que.name}, params: {type: "dailyques"}});
                }
                // New Problem finding
                fetch("https://codeforces.com/api/user.rating?handle="+req.params.username).then(res=>res.json()).then(async (rates)=>{
                    let rating = rates.result[rates.result.length-1].newRating || 800;
                    if(rating < 800){
                        rating = 800;
                    }
                    if(rating >= 2700){
                        rating = 2300;
                    }
                    let ratingStart = rating-100,ratingEnd = rating+100;
                    let problem = await findAndFilter(solved, ratingStart,ratingEnd);
                    usr.daily_Que = problem._id;
                    await usr.save();
                    res.json(problem);
                }).catch(async err => {
                    let rating = 800;
                    let ratingStart = rating,ratingEnd = rating+100;
                    let problem = await findAndFilter(solved, ratingStart,ratingEnd);
                    usr.daily_Que = problem._id;
                    await usr.save();
                    res.json(problem);
                });
            }else{
                var dc = JSON.parse(JSON.stringify(usr.daily_Que));
                dc.link = `https://codeforces.com/problemset/problem/${dc.contestId}/${dc.index}`;
                res.json(dc);
            }
        }).catch(err => {res.json(false)});

    });
})

async function CheckQuestion(req){
    return fetch("https://codeforces.com/api/user.status?handle="+req.query.username).then(res => res.json()).then(async (data)=>{
        let problem = {
            contestId:req.query.contestId,
            name:req.query.name,
            index:req.query.index,

        };
        let temp = await Problem.findOne({hash: problem.name+problem.contestId+problem.index});
        if(temp){
            problem._id = temp._id;
            problem.rating = temp.rating;
        }
        let result = data.result;
        for(let i=0;i<result.length;i++){
            if((problem.contestId == result[i].problem.contestId || problem.name == result[i].problem.name) && problem.index == result[i].problem.index && result[i].verdict === "OK"){
                
                if(req.params.type === "upsolve"){
                    let today = new Date();
                    let date = `${today.getDate()}`+"-"+`${(parseInt(today.getMonth()+1))}`+"-"+`${today.getFullYear()}`;
                    date = "UpsolveStreak."+date;
                    
                    User.updateOne({username: req.query.username},{
                        
                        
                        $inc:{
                            
                            
                            UpsolveQuestion: 1 
                        },
                        $push:{
                            [date]: problem
                        }
                            
                        
                    
                    }).then((result,err) => {})
                }
                else{
                    User.updateOne({username: req.query.username},{
                        
                        $set:{    
                          
                            dailyQuestion: true


                        },
                        $inc:{
                                
                            streak: 1 
                        }
                            
                        
                    
                    }).then((result,err) => {})
                }
                return true;
                
            }
        }
        return false;
        
    }).catch(err => (false));
}

app.get('/check/:type',async (req,res)=>{
    
    res.json(await CheckQuestion(req));
})



module.exports = app;
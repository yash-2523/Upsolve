import fetch from "node-fetch";
import {config as cf} from '../constants';

let config = cf.url.toString();

let getToken = () =>{
    return window.localStorage.getItem("token");
}

async function  getUser(id) {
    if(!id){
        return false;
    }
    return fetch(config+'/api/users/getUser/'+id).then(res => res.json());
}
async function  getUserByname(username) {
    if(!username){
        return false;
    }
    return fetch(config+'/api/users/getUserByname/'+username).then(res => res.json())
}
async function Check(props,type) {
    return fetch(config+'/api/problem/check/'+type+'?username='+props.payload.username+'&name='+props.problem.name+'&index='+props.problem.index+'&contestId='+props.problem.contestId).then(res => res.json())
}

async function dailyQuestion(props) {
    return fetch(config+'/api/problem/dailyques/'+props.payload.username).then(res => res.json())
}
async function UpsolveQuestion(props) {
    return fetch(config+'/api/problem/upsolve/'+props.payload.username).then(res => res.json())
}



async function LeaderboardList(skip,limit,filter) {
    return fetch(config+'/api/users/list?skip='+((skip-1)*limit)+'&limit='+limit+'&country='+filter.country+'&institution='+filter.institution+'&username='+filter.username).then(res => res.json());
}

async function Profile() {
    return fetch(config+'/api/users/profile',{
        method:"get",
        headers: {
            "Authorization": getToken(),

        }
    }).then(res => res.json());
}


export {Check,dailyQuestion,UpsolveQuestion,LeaderboardList,Profile,getUser,getUserByname};
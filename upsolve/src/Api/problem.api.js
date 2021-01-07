import fetch from "node-fetch";

let getToken = () =>{
    return window.localStorage.getItem("token");
}

async function  getUser(id) {
    if(!id){
        return false;
    }
    return fetch('http://localhost:4000/api/users/getUser/'+id).then(res => res.json());
}
async function  getUserByname(username) {
    if(!username){
        return false;
    }
    return fetch('http://localhost:4000/api/users/getUserByname/'+username).then(res => res.json())
}
async function Check(props,type) {
    return fetch('http://localhost:4000/api/problem/check/'+type+'?username='+props.payload.username+'&name='+props.problem.name+'&index='+props.problem.index+'&contestId='+props.problem.contestId).then(res => res.json())
}

async function dailyQuestion(props) {
    return fetch('http://localhost:4000/api/problem/dailyques/'+props.payload.username).then(res => res.json())
}
async function UpsolveQuestion(props) {
    return fetch('http://localhost:4000/api/problem/upsolve/'+props.payload.username).then(res => res.json())
}



async function LeaderboardList(skip,limit,filter) {
    return fetch('http://localhost:4000/api/users/list?skip='+((skip-1)*limit)+'&limit='+limit+'&country='+filter.country+'&institution='+filter.institution+'&username='+filter.username).then(res => res.json());
}

async function Profile() {
    return fetch('http://localhost:4000/api/users/profile',{
        method:"get",
        headers: {
            "Authorization": getToken(),

        }
    }).then(res => res.json());
}


export {Check,dailyQuestion,UpsolveQuestion,LeaderboardList,Profile,getUser,getUserByname};
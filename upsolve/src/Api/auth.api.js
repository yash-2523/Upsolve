// import { post } from "../../../api/users.api";
import {config as cf} from '../constants';

let config = cf.url;

function getToken() {
    return window.localStorage.getItem("token");
}

function TokenAuthentication() {
    let token = getToken();
    if(!token){
        return false;
    }
    let payload =JSON.parse(atob(token.split('.')[1]));
    return payload;
}

async function loginProcess(username,password) {
    
    
    return fetch(config+'/api/users/login',{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,password
        })
    }).then(res => res.json()).then((data) => {
        if(data.status){
            window.localStorage.setItem("token",data.token);
            window.location = "/challenge";
            return true;
        }
        else{
            return false;
            
        }
    });
}  

async function updateUser(username,firstName,lastName,country,institution,bio) {
    return fetch(config+'/api/users/updateuser',{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            name: firstName+" "+lastName,
            country: country,
            institution: institution,
            bio: bio
        })
    }).then(res => res.json()).then((result) => {return true}).catch(err => {return false});
}

async function registrationProcess(username,password,country,institution,bio) {
    return fetch(config+'/api/users/register',{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            country,
            institution,
            bio
        })
    }).then(res => res.json()).then((result) => {return result.status}).catch((err) => {return false});
}

function getFirstName(username) {
    return fetch('https://codeforces.com/api/user.info?handles='+username).then(res => res.json()).then(users=> {
        if(users.status==="OK"){
            return users.result[0].firstName;
        }else{
            return false;
        }
    }).catch(err => {
        console.log(err);
        return false;
    })
}

function logout() {
    window.localStorage.removeItem("token");
    window.location = '/'
}

export {getToken,TokenAuthentication,loginProcess,logout,getFirstName,registrationProcess,updateUser};
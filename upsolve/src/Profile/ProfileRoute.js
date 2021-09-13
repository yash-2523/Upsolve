import React, { useEffect, useState } from 'react'
import NavigationMenu from '../NavigationMenu'
import {getUserByname} from '../Api/problem.api';
import ProfilePage from './ProfilePage'
import {getToken,TokenAuthentication} from '../Api/auth.api'

function ProfileRoute(props) {
    
    const [user,setuser] = useState({});
    const paramUsername = props.match.params.username.toLowerCase();
    const [loggedinUser,setloggedinUser] = useState(false)
    

    useEffect(async () => {
        if(paramUsername === undefined){
        
            window.location = '/error';
            
            
        }
        
        getUserByname(paramUsername).then((User) => {
            if(!User){
                console.log(User);
                window.location = '/error';
                return;
            }
            else{
                let loggedinUsername = null;
                if(getToken()){
                    loggedinUsername = TokenAuthentication().username.toLowerCase();      
                }
                if(loggedinUsername === User.username){
                    setloggedinUser(true);
                }
                setuser(User);
            }
        })
        
        
    },[])
    
    
    
    return (
        <div>
           <NavigationMenu></NavigationMenu> 
           {user._id ? <ProfilePage user={user} loggedinUser={loggedinUser}></ProfilePage> : <></>}
        </div>
    )
}
export default ProfileRoute;
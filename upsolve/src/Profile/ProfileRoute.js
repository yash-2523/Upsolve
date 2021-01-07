import React, { useEffect, useState } from 'react'
import NavigationMenu from '../NavigationMenu'
import {getUserByname} from '../Api/problem.api';
import ProfilePage from './ProfilePage'

function ProfileRoute(props) {
    
    const [user,setuser] = useState({});
    const paramUsername = props.match.params.username;
    
    

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
                console.log(User);
                setuser(User);
            }
        })
        
        
    },[])
    
    
    
    return (
        <div>
           <NavigationMenu></NavigationMenu> 
           {user._id ? <ProfilePage user={user}></ProfilePage> : <></>}
        </div>
    )
}
export default ProfileRoute;
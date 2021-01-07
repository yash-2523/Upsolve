
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

import NavigationMenu from './NavigationMenu';
import BoxTitle from './BoxTitile';
import {loginProcess,getToken,TokenAuthentication} from './Api/auth.api';


    



function LoginPage() {
    
    // const [username,setusername] = useState("");
    const [error,setError] = useState(false);
    const [isLoading,setisLoading] = useState(false)
    let username,password;

    useEffect(() => {
        if(getToken()){
            let payload = TokenAuthentication();
            window.location = '/profile/'+payload.username;
        }
    },[])
    
    return(

        
        <div>

            <NavigationMenu></NavigationMenu>
            {error ? 
            <div className="alert-heading text-center p-1 m-auto bg-danger text-light alert-animation" style={{width: "30%",borderRadius: "5px","fontSize": "1.2rem"}}>
                Incorrect Credentials
            </div> 
            
            : ''}

            <div className="box">
                <BoxTitle title="Login"></BoxTitle>
                <div className={isLoading ? "box-content-dimension loading" : "box-content-dimension"}>
                    <div className="box-form">
                        <label for="username">Username:</label>
                        <input type="text" placeholder="Enter Username" onChange={(e)=>{username = e.target.value}}></input>
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Enter Password" onChange={(e)=>{password = e.target.value}}></input>
                    </div>
                    <button className="shadow" onClick={async () => {
                        setisLoading(true);
                        let result = await loginProcess(username,password,setError)
                        setisLoading(false);
                        if(!result || result === false){
                            setError(true);
                            setTimeout(() => {
                                setError(false);
                            },5000)
                        }
                        
                        }}>{isLoading ? "Logging..." : "Login"}</button>
                    <a href="">Create New Account</a>
                </div>
            </div>

            
            
        </div>
    )
}

export default LoginPage;
import React, { useEffect,useState } from 'react';


function LogoutPage() {
    
    useEffect(()=>{
        window.localStorage.setItem("token",null);
        window.location = "/login"
    },[])
    return(
        <div>
            
        </div>
    )

}

export default LogoutPage;
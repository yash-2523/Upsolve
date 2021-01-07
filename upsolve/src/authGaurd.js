import React,{useEffect, useState} from 'react';
import {TokenAuthentication} from './Api/auth.api'



function AuthGaurd({children}) {

    const [status,setstatus] = useState(false);
    useEffect(()=>{
        let payload = TokenAuthentication();
        if(payload === false){
            window.location = '/login'
            
        }
        else{
            setstatus(true);
        }
    },[])
    return (<div>
        {status ? children : ""}
    </div>);
}

export default AuthGaurd;

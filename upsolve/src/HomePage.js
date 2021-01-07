import React, { useEffect,useState } from 'react';
import {Profile} from './Api/problem.api'

function HomePage() {
    const [user,setuser] = useState("");
    useEffect(()=>{
        
    },[])
    return(
        <div>
            {JSON.stringify(user)}
        </div>
    )

}

export default HomePage;
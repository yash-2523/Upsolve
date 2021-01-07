import {useState,useEffect} from 'react';
function ChallengeTimer() {
    
    const [timer,settimer] = useState(new Date());

    useEffect(()=>{
        setInterval(()=>{settimer(new Date())},1000);
        
    },[]);

    let getHours = () =>{
        
        let hours = parseInt(23 - timer.getHours());
        if(hours < 10){
            hours = "0"+hours;
        }
        return hours;
    }
    let getMinutes = () =>{
        
        let minutes = parseInt(59 - timer.getMinutes());
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        return minutes;
    }
    let getSeconds = () =>{
        
        let seconds = parseInt(59 - timer.getSeconds());
        if(seconds < 10){
            seconds = "0"+seconds;
        }
        return seconds;
    }

    return(
        <h1 style={{color:"white",textShadow:"0px 0px 15px red"}}>{getHours()} : {getMinutes()} : {getSeconds()}</h1>
    )
    
}

export default ChallengeTimer;
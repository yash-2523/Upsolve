import React,{useEffect,useState} from 'react';
import ChallengeTimer from './ChallengeTimer'
import ChallengeDailyQues from './ChallengeDailyQues'
import ChallengeUpsolveQues from './ChallengeUpsolveQues'
import Skeleton from '@material-ui/lab/Skeleton';
import {TokenAuthentication} from '../Api/auth.api';

function ChallengeContent() {

    const [payload,setpayload] = useState({});

    useEffect(()=> {
        let user = TokenAuthentication();
        if(user){
            setpayload(user);
        }
    },[])
    return(

        
        
        <div className="challenge text-center">
            <ChallengeTimer></ChallengeTimer>
            {
                <div className="problem-container">
                    <ChallengeDailyQues payload={payload}></ChallengeDailyQues>
                    <ChallengeUpsolveQues payload={payload}></ChallengeUpsolveQues>
                </div>
            ||
                <div className="text-center" style={{width:"100%",margin:"auto"}}> 
                    <Skeleton width="80%" height="4rem" style={{color:"grey",margin:"auto",borderRadius: "999px"}}></Skeleton>
                    <Skeleton width="80%" height="4rem" style={{color:"grey",margin:"auto",borderRadius: "999px"}}></Skeleton>
                    <Skeleton width="80%" height="4rem" style={{color:"grey",margin:"auto",borderRadius: "999px"}}></Skeleton>
                    <Skeleton width="80%" height="4rem" style={{color:"grey",margin:"auto",borderRadius: "999px"}}></Skeleton>
                    <Skeleton width="80%" height="4rem" style={{color:"grey",margin:"auto",borderRadius: "999px"}}></Skeleton>
                </div>
            }
        </div>    
    );
}

export default ChallengeContent;
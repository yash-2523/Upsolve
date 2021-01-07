import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import ProblemCardTitle from './ProblemCardTitle'
import ProblemDescription from './ProblemDescription'
import {UpsolveQuestion,getUser} from '../Api/problem.api'

function ChallengeUpsolveQues(props) {

    const [problem,setproblem] = useState({
        name: "",
        contestId: "",
        index: "",
        link: "",
        rating: "",
    });
    
    const [upsolve,setupsolve] = useState(-1);
    getUser(props.payload._id).then((user) => {setupsolve(user.UpsolveQuestion)})
    const [problemError,setproblemError] = useState(null);
    useEffect(()=>{
        if(upsolve >= 0){
            UpsolveQuestion(props).then((problem)=>{
                
                if(problem === false){
                    setproblemError("Unable to fetch the Problem")
                    
                }
                else{
                    setproblem(problem);
                    setproblemError(null);
                }
            });
        }
    },[problemError,upsolve])
    return(
        
           <div className="Upsolveques-section">
                
                <ProblemCardTitle upsolve={Math.max(0,upsolve)} title="Upsolve Question"></ProblemCardTitle>
                <ProblemDescription payload={props.payload} problem={problem} Error={problemError} refresh={() => {setproblemError(null)}} solved={false} upsolve={upsolve} updateupsolve={(result)=> {setupsolve(upsolve + 1);setproblemError(null)}}></ProblemDescription>
            </div>
            
        
        
    )
}

export default ChallengeUpsolveQues;
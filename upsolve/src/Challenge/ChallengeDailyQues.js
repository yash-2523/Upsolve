import React from 'react';
import ProblemCardTitle from './ProblemCardTitle'
import ProblemDescription from './ProblemDescription'
import  { useEffect, useState } from 'react';
import {dailyQuestion,getUser} from '../Api/problem.api';
function ChallengeDailyQues(props) {

    const [problem,setproblem] = useState({
        name: "",
        contestId: "",
        index: "",
        link: "",
        rating: "",
    });
    const [solved,setsolved] = useState("");
    getUser(props.payload._id).then((user) => {setsolved(user.dailyQuestion)})
    const [problemError,setproblemError] = useState(null);
    useEffect(()=>{
        if(!solved && solved !== ""){
            dailyQuestion(props).then((problem)=>{
                console.log("daily",problem)
                if(problem === false){
                    setproblemError("Unable to fetch the Problem")
                    
                }
                else{
                    setproblem(problem);
                    setproblemError(null);
                }
            })
        }
    },[problemError,solved])
    return(

        <div className="dailyques-section">
            
            <ProblemCardTitle solved={solved} title="Daily Question"></ProblemCardTitle>
            <ProblemDescription payload={props.payload} problem={problem} Error={problemError} refresh={() => {setproblemError(null)}} solved={solved} updatesolved={(result)=> {setsolved(result)}}></ProblemDescription>
        </div>
    )
}

export default ChallengeDailyQues;
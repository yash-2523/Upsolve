import Skeleton from '@material-ui/lab/Skeleton';
import fetch from 'node-fetch';
import React, { useEffect,useState } from 'react';
import {Check} from '../Api/problem.api';
import Tooltip from '@material-ui/core/Tooltip';

function ProblemDescription(props) {

    const [checking,setchecking] = useState(false);

    let CheckProblem = () =>{
        setchecking(true);
        
        Check(props,props.upsolve!==undefined ? "upsolve" : "daily").then((result) => {
            setchecking(false);
            
            if(result === true){
                props.upsolve===undefined ? props.updatesolved(true) : props.updateupsolve(true);
            }
        })
    }
    
    return(
        props.Error===null ?
            !props.solved ?
            (props.problem?.name ? 
            <div className="problem-description">
                <div className="description">
                    <label>Problem: </label>
                    <a href={props.problem?.link} target="_blank">{props.problem?.name}</a>
                    <label>ContestID: </label>
                    <a href={"https://codeforces.com/contest/"+props.problem?.contestId} target="_blank">{props.problem?.contestId}</a>
                    <label>Rating: </label>
                    <p>{props.problem?.rating}</p>
                </div>
                <button className="shadow" onClick={CheckProblem} disabled={checking}>{checking?"Checking...":"Check"}</button>
  
            </div>
            :
            <div style={{width:"100%"}}>
                <Skeleton width="78%" height="3rem" style={{margin:"0.7rem auto",color:"grey",borderRadius:"999px"}}></Skeleton>
                <Skeleton width="78%" height="3rem" style={{margin:"0 auto 0.7rem auto",color:"grey",borderRadius:"999px"}}></Skeleton>
                <Skeleton width="78%" height="3rem" style={{margin:"0 auto 0.7rem auto",color:"grey",borderRadius:"999px"}}></Skeleton>
                <Skeleton width="78%" height="3rem" style={{margin:"0 auto 0.7rem auto",color:"grey",borderRadius:"999px"}}></Skeleton>
            </div>)
            :
            (
                <div className="problem-description">
                    <h1>Solve More upsolve questions</h1>
                </div>
            ) 
        :
        (
            <div className="problem-description">
                <h1>{props.Error} <Tooltip title="Refresh" arrow><i className="fa fa-refresh" role="button" onClick={() => {props.refresh()}}></i></Tooltip></h1>
            </div>
        )   
    )
}

export default ProblemDescription;
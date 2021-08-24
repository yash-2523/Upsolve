import Skeleton from '@material-ui/lab/Skeleton';
import fetch from 'node-fetch';
import React, { useEffect,useState } from 'react';
import {Check} from '../Api/problem.api';
import Tooltip from '@material-ui/core/Tooltip';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function ProblemDescription(props) {

    const [checking,setchecking] = useState(false);
    const [SnackBarOpen, setSnackBarOpen] = React.useState(false);
    const [AlertMsg,setAlertMsg] = useState("");

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      

    let CheckProblem = () =>{
        setchecking(true);
        
        Check(props,props.upsolve!==undefined ? "upsolve" : "daily").then((result) => {
            setchecking(false);
            if(result === true){
                if(props.upsolve===undefined){
                    props.updatesolved(true);
                    
                } 
                else{
                    props.updateupsolve(true);
                    
                }

                setAlertMsg(<Alert onClose={() => setSnackBarOpen(false)} severity="success">
                        Great Job! 🥳  
                    </Alert>)
                setSnackBarOpen(true)
                
            }else{
                setAlertMsg(<Alert onClose={() => setSnackBarOpen(false)} severity="error">
                        The Solution is not accepted yet! Try Again.
                    </Alert>)
                setSnackBarOpen(true)
                
            }
        })
    }
    return(
        props.Error===null ?
            !props.solved ?
            (props.problem?.name ? 
            <>
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
            <Snackbar open={SnackBarOpen} autoHideDuration={5000} onClose={() => setSnackBarOpen(false)}>
                    {AlertMsg}
                </Snackbar>
            </>
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
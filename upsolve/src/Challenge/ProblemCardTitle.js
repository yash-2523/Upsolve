import React from 'react';

function ProblemCardTitle(props) {
    
    return(
        
        <div className="problem-card-title">
            <div className="checkmark-circle">
                {props.upsolve===undefined ? <div className={props.solved ?"checkmark draw":""}></div> : <p>{props.upsolve}</p>}
            </div>
            <h1>{props.title}</h1>
        </div>
    );
}

export default ProblemCardTitle;
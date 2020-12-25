import React from 'react';
export default class Entry extends React.Component{

    
    render(){
        let id = "table"+this.props.id;
        return(
            <div class="entry shadow">
                
                <div class="rank">{this.props.id + 1} </div>
                <div class="names">{this.props.name}</div>
                <div class="progress" id={id}>
                    
                </div>
            </div>
        )
    }
};
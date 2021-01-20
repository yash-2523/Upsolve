import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Link} from 'react-router-dom'
export default class Entry extends React.Component{

    
    render(){
        let id = "table"+this.props.id;
        let percentage = parseInt((this.props.streak/30)*100);
        
        return(
            <Link to={"/profile/"+this.props.name} style={{textDecoration: "none"}}>
            <div class="entry shadow">
                
                <div class="rank">{this.props.id + parseInt(this.props.offset) + 1} </div>
                <div class="names">{this.props.name}</div>
                <CircularProgressbar className="PB"
                  value={percentage}
                  text={this.props.streak}
                  styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color
                      stroke: 'linear-gradient(#0052D4, #4364F7, #6FB1FC)',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                      // Customize transition animation
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                      // Rotate the path
                    //   transform: 'rotate(0.25turn)',
                      transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                      // Trail color
                      stroke: '#d6d6d6',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                      // Rotate the trail
                    //   transform: 'rotate(0.25turn)',
                      transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: 'linear-gradient(#0052D4, #4364F7, #6FB1FC)',
                      // Text size
                      fontSize: '2rem',
                      fontWeight: '800'
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: 'transparent',
                    },
                  }}
                />
                    
                
            </div>
            </Link>
        )
    }
};
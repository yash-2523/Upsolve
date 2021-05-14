import React, { useState } from 'react'

export default function Team() {

    const [descnum,setdescNum] = useState(0);
    let description = [];
    description.push(["Yash Doshi","orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]);
    description.push(["Shivam Thakker","orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]);
    description.push(["Parshwa Shah","orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]);
    description.push(["Jay Mehta","orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]);

    return (
        <section className="col-12 mt-5 p-3">
            <h1 className="text-center team-section-title">Team Members</h1>
            <div className="position-relative py-5 mt-5 team-parent">
                <div className="position-absolute team-title">
                    <h3 className="text-center">{descnum!==0 ? description[descnum - 1][0] : ''}</h3>
                    <p className="text-center">{descnum!==0 ? description[descnum - 1][1] : 'Tap on any image'}</p> 
                </div>
                <div className="mx-auto position-relative team-ring">
                    
                    <div className={"icon" + (descnum === 1 ? " icon-active" :  "")} onClick={() => setdescNum(1)} style={{top: '0%', left: "50%", transform: 'translate(-50%,-50%)'}}><img className="icon1" src={'https://source.unsplash.com/random'}></img></div>
                    <div className={"icon" + (descnum === 2 ? " icon-active" :  "")} onClick={() => setdescNum(2)} style={{top: '50%', left: "0%", transform: 'translate(-50%,-50%)'}}><img className="icon1" src={'https://source.unsplash.com/random'}></img></div>
                    <div className={"icon" + (descnum === 3 ? " icon-active" :  "")} onClick={() => setdescNum(3)} style={{top: '100%', left: "50%", transform: 'translate(-50%,-50%)'}}><img className="icon1" src={'https://source.unsplash.com/random'}></img></div>
                    <div className={"icon" + (descnum === 4 ? " icon-active" :  "")} onClick={() => setdescNum(4)} style={{top: '50%', left: "100%", transform: 'translate(-50%,-50%)'}}><img className="icon1" src={'https://source.unsplash.com/random'}></img></div>
                </div>
            </div>
        </section>
    )
}

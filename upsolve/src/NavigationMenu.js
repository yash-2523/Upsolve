import React,{useState,useEffect} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {logout,TokenAuthentication} from './Api/auth.api';
import {Link} from 'react-router-dom'
function NavigationMenu() {

    const [status,setstatus] = useState(false);
    const [payload,setpayload] =useState({});
    const [open,setOpen] = useState(false);


    useEffect(()=>{
        let payload = TokenAuthentication();
        if(payload){
            setstatus(true);
            setpayload(payload)
        }
    },[])

    let Toggler = ()=>{
        setOpen(!open);
    }

    return (
        <section class="navigation-menu">
            <div class="nav-bar col-12">
                <p class="text-center">Upsolve</p>
                <div class="nav-items col-lg-3 col-6 text-center">
                    <a onClick={(e) => {Toggler()}} className="position-relative back-btn" >
                        <Tooltip title="Navigate" arrow>
                            <div>
                                <i class="fa fa-rocket"></i>
                            </div>
                        </Tooltip>
                        {open ? 
                        <>
                        <a href="/" className="position-absolute back-btn" style={{top: "120%", left: "-120%"}}>
                            <Tooltip title="Home" arrow>
                                <div>
                                    <i class="fa fa-home"></i>
                                </div>
                            </Tooltip>
                            
                        </a>
                        <a href="/leaderboard" className="position-absolute back-btn" style={{top: "170%", left: "0%"}}>
                            <Tooltip title="Leaderboard" arrow>
                                <div>
                                    <i class="fa fa-trophy"></i>
                                </div>
                            </Tooltip>
                            
                        </a>
                        <a href="/challenge" className="position-absolute back-btn" style={{top: "120%", left: "120%"}}>
                            <Tooltip title="Challenge" arrow>
                                <div>
                                    <i class="fa fa-calendar-check-o"></i>
                                </div>
                            </Tooltip>
                            
                        </a>
                        </>
                        : 
                         <></>       
                        }                       
                    </a>
                    <a href={status ? "/profile/"+payload?.username : "/login"} data-toogle="tooltip" data-palcement="bottom" title={status ? payload?.username : "Login/Register"}>
                        <Tooltip title={status ? payload?.username : "Login/Register"} arrow>
                            <div>
                                <i class="fa fa-user"></i>
                            </div>
                        </Tooltip>
                    </a>
                    {status && <a href="#" data-toogle="tooltip" data-palcement="bottom" title="Logout">
                        <Tooltip title="Logout" arrow>
                            <div onClick={() => {logout()}}>
                                <i class="fa fa-sign-out"></i>
                            </div>
                        </Tooltip>
                    </a>
                    }
                </div>
            </div>
        </section>
    );
}

export default NavigationMenu;

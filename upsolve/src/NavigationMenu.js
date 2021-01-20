import React,{useState,useEffect} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {logout,TokenAuthentication} from './Api/auth.api';
import {Link} from 'react-router-dom'
function NavigationMenu() {

    const [status,setstatus] = useState(false);
    const [payload,setpayload] =useState({});
    useEffect(()=>{
        let payload = TokenAuthentication();
        if(payload){
            setstatus(true);
            setpayload(payload)
        }
    },[])
    return (
        <section class="navigation-menu">
            <div class="nav-bar col-12">
                <p class="text-center">Upsolve</p>
                <div class="nav-items col-lg-3 col-6 text-center">
                    <a href="#" class="back-btn" >
                        <Tooltip title="Back" arrow>
                            <div>
                                <i class="fa fa-rocket"></i>
                            </div>
                        </Tooltip>
                    </a>
                    <Link to={status ? "/profile/"+payload?.username : "/login"}><a href="#" data-toogle="tooltip" data-palcement="bottom" title={status ? payload?.username : "Login/Register"}>
                        <Tooltip title={status ? payload?.username : "Login/Register"} arrow>
                            <div>
                                <i class="fa fa-user"></i>
                            </div>
                        </Tooltip>
                    </a></Link>
                    <a href="#" data-toogle="tooltip" data-palcement="bottom" title="Logout">
                        <Tooltip title="Logout" arrow>
                            <div onClick={() => {logout()}}>
                                <i class="fa fa-sign-out"></i>
                            </div>
                        </Tooltip>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default NavigationMenu;

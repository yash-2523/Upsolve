
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';

import NavigationMenu from './NavigationMenu';
import BoxTitle from './BoxTitile';
import {Link} from 'react-router-dom'
import {loginProcess,getToken,TokenAuthentication, CheckUser, getFirstName, UpdatePassword} from './Api/auth.api';


    
function ForgotPassword(props){
    const [steps,setSteps] = useState(0);
    const [handle,setHandle] = useState("");
    const [optCode,setoptCode] = useState(false);
    const [timer,settimer] = useState(0);
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [validatePassword,setvalidatePassword] = useState("Please fill out this field");

    useEffect(()=>{
        
        if(timer>0){
            setTimeout(()=> {settimer(timer - 1)},1000);
        }

        
    },[timer])

    let checkPassword = (e) => {
        let psw = e.target.value;

        if(psw.length < 8){
            setvalidatePassword("Atleast 8 characters required");
            return;
        }

        if(!psw.match(/[a-z]/g)){
            setvalidatePassword("Lowercase character is required");
            return;
        }

        if(!psw.match(/[A-Z]/g)){
            setvalidatePassword("Uppercase character is required");
            return;
        }

        if(!psw.match(/[0-9]/g)){
            setvalidatePassword("A digit is required");
            return;
        }

        if(!psw.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)){
            setvalidatePassword("Special character is required");
            return;
        }
        setvalidatePassword(true);
    }

    const renderer = (timer) => {
        let minutes = parseInt(timer/60);
        let seconds = parseInt(timer - (minutes*60));
        if (timer<=0) {
          
          if(steps===1 && !props.isLoading){
            setSteps(0);
          }
          return <span>{"00:00"}</span>    
        }
        else{ // Render a countdown
        return <span>{"0"+minutes}:{seconds<10 ? "0"+seconds : seconds}</span>;
        }
      };


    const StepContent = [
        <>
            <i className="fa fa-arrow-left align-self-start" style={{cursor: "pointer"}} onClick={() => props.close()}></i>
            <div className="box-form my-3">
                <label for="username">Username:</label>
                <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="Enter Username"></input>
            </div>
            <button className="shadow" disabled={handle===""} onClick={async () => {
                props.loading(true)
                let result = await CheckUser(handle);
                props.loading(false)
                if(result.status){
                    var OTP = Math.ceil(Math.random()*1000000);
                    settimer(90);
                    setoptCode(OTP);
                    setSteps(prev => prev+1);
                }else{
                    props.error(result.error);
                    setTimeout(() => {
                        props.error(false);
                    },5000)
                }
            }}>Proceed</button>
        </>,
        <>
            <i className="fa fa-arrow-left align-self-start" style={{cursor: "pointer"}} onClick={() => setSteps(prev => prev-1)}></i>
            <h1>{renderer(timer)}</h1>
            <p>Change the first name of your codeForces handle to this "<b>{optCode}</b>" (Without Quote). <br></br><strong>{"CodeForces --> Profile --> Settings --> Social --> Change your first name"}</strong></p>
            <button className={props.isloading ? " loading" : ""} onClick={async () => {
                props.loading(true);
                let result = await getFirstName(handle);
                
                if(parseInt(result) !== parseInt(optCode)){
                    props.loading(false);
                    props.error("Unable to verify");
                    setSteps(0)
                    setTimeout(() => {
                        props.error("");
                    },5000)
                }
                else{
                    props.loading(false)
                    setSteps(prev => prev+1)
                }
            }}>{props.isloading ? "Verifying..." : "Verify"}</button>
        </>,
        <>
            <div className="box-form">
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" class="form-control" onChange={(e) => {setpassword(e.target.value);checkPassword(e)}} placeholder="Enter Password" required />
                    {validatePassword !== true ? <div class="text-danger">{validatePassword}</div> : ''}
                </div>
                <div class="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" class="form-control" onChange={(e) => {setconfirmpassword(e.target.value)}} placeholder="Confrim Password" required />
                    {confirmpassword === "" ? <div className="text-danger">Please fill out this field.</div> : (confirmpassword !== password ? <div className="text-danger">Should match the password</div> : '')}
                    
                </div>
            </div>
            <button disabled={validatePassword!==true || password!==confirmpassword} onClick={async () => {
                props.loading(true);
                let result = await UpdatePassword(handle,password);
                if(result){
                    props.loading(false)
                }else{
                    props.loading(false)
                    props.error("Something Went Wrong");
                    setTimeout(() => {
                        props.error("");
                    },5000)
                }
            }}>Save</button>
        </>
    ]

    return (
        StepContent[steps]
    )
}


function LoginPage() {
    
    // const [username,setusername] = useState("");
    const [error,setError] = useState(false);
    const [isLoading,setisLoading] = useState(false);
    const [forgotPasword,setForgotPassword] = useState(false);
    let username="",password="";

    

    useEffect(() => {
        if(getToken()){
            let payload = TokenAuthentication();
            window.location = '/profile/'+payload.username;
        }
        console.log(username,password)
    },[])
    
    return(

        
        <div>

            <NavigationMenu></NavigationMenu>
            {error !== false ? 
            <div className="alert-heading text-center p-1 m-auto bg-danger text-light alert-animation" style={{width: "30%",borderRadius: "5px","fontSize": "1.2rem"}}>
                {error}
            </div> 
            
            : ''}

            <div className="box">
                <BoxTitle title="Login"></BoxTitle>
                <div className={isLoading ? "box-content-dimension loading" : "box-content-dimension"}>
                {forgotPasword ? <ForgotPassword close={() => setForgotPassword(false)} error={(e) => setError(e)} isLoading={isLoading} loading={(b) => setisLoading(b)} /> : <>
                    <div className="box-form">
                        <label for="username">Username:</label>
                        <input type="text" placeholder="Enter Username" onChange={(e)=>{username = e.target.value}}></input>
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Enter Password" onChange={(e)=>{password = e.target.value}}></input>
                    </div>
                    <a className="text-primary" onClick={() => setForgotPassword(true)} style={{fontSize: '14px',cursor: 'pointer'}}>Forgot Password ?</a>
                    <button className="shadow" onClick={async (e) => {
                        
                        setisLoading(true);
                        let result = await loginProcess(username,password)
                        e.target.previousSibling.childNodes[1].value = "";
                        e.target.previousSibling.childNodes[3].value = "";
                        setisLoading(false);
                        if(!result || result === false){
                            console.log("Error", result)
                            setError("Incorrect Credentials");
                            setTimeout(() => {
                                setError(false);
                            },5000)
                        }
                        
                        }}>{isLoading ? "Logging..." : "Login"}</button>
                        
                    <Link to="/register">Create an Account</Link>
                    </>}
                </div>
            </div>

            
            
        </div>
    )
}

export default LoginPage;
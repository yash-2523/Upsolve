
import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import {getUserByname} from './Api/problem.api'
import {getFirstName,registrationProcess,getToken,TokenAuthentication} from './Api/auth.api'
import NavigationMenu from './NavigationMenu';
import BoxTitle from './BoxTitile';
import {Link} from 'react-router-dom'
import Countdown from 'react-countdown';



    



function RegisterPage() {
    
    
    const [isloading,setisLoading] = useState(false);
    const [Error,setError] = useState("");
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [country,setcountry] = useState("");
    const [institution,setinstitution] = useState("");
    const [bio,setbio] = useState("");
    const [validatePassword,setvalidatePassword] = useState("Please fill out this field");
    const [optPgae,setoptPage] = useState(false);
    const [optCode,setoptCode] = useState(false);
    const [timer,settimer] = useState(0);
    const country_list = require('country-list');

    useEffect(()=>{

        if(getToken()){
            let payload = TokenAuthentication();
            window.location = '/profile/'+payload.username;
        }
        
        if(timer>0){
            setTimeout(()=> {settimer(timer - 1)},1000);
        }
    },[timer])


    let init = ()=>{
        setusername("");
        setpassword("");
        setconfirmpassword("");
        setcountry("");
        setinstitution("");
        setbio("");
        setvalidatePassword("Please fill out this field")
        setError("");
        setisLoading(false);
        setoptCode(false);
        settimer(0);
    }
    
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
          
          if(optPgae && !isloading){
            init();
            setoptPage(false);
          }
          return <span>{"00:00"}</span>    
        }
        else{ // Render a countdown
        return <span>{"0"+minutes}:{seconds<10 ? "0"+seconds : seconds}</span>;
        }
      };

    return(

        
        <div>

            <NavigationMenu></NavigationMenu>
            
            {Error !== "" ? 
            <div className="alert-heading text-center p-1 m-auto bg-danger text-light alert-animation" style={{width: "30%",borderRadius: "5px","fontSize": "1.2rem"}}>
                {Error}
            </div> 
            
            : ''}

            <div className="box">
                <BoxTitle title="Register"></BoxTitle>
                {optPgae === false ?
                <div className={"box-content-dimension mb-5"+ (isloading ? " loading" : "")}>
                    
                    <div className="box-form p-4">
                        
                            <div class="form-group">
                                <label>Username:</label>
                                <input type="text" className="form-control" placeholder="Enter codeForces Handle" onChange={(e) => {setusername(e.target.value)}} required />
                                {username === "" ? <div class="text-danger">Please fill out this field.</div> : ''}
                            </div>
                            <div class="form-group">
                                <label>Country: <select onChange={(e) => {setcountry(e.target.value)}}>
                                                    <option value="">--Select--</option>
                                                    {country_list.getNames().map((ct) => <option value={ct}>{ct}</option>)}
                                                </select>
                                </label>
                                
                            </div>
                            <div class="form-group" style={{display: "none"}}>
                                <label>Institution: <select onChange={(e) => {setinstitution(e.target.value)}}>
                                                    <option value="India">India</option>
                                                </select>
                                </label>
                                
                            </div>
                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" class="form-control" onChange={(e) => {setpassword(e.target.value);checkPassword(e)}} placeholder="Enter password" required />
                                {validatePassword !== true ? <div class="text-danger">{validatePassword}</div> : ''}
                            </div>
                            <div class="form-group">
                                <label>Confirm Password:</label>
                                <input type="password" class="form-control" onChange={(e) => {setconfirmpassword(e.target.value)}} placeholder="Confrim Password" required />
                                {confirmpassword === "" ? <div className="text-danger">Please fill out this field.</div> : (confirmpassword !== password ? <div className="text-danger">Should match the password</div> : '')}
                                
                            </div>
                            
                        
                    </div>
                    <button type="submit" className="shadow" onClick={async () => {
                        if(validatePassword !== true || username === "" || password !== confirmpassword){return}
                        setisLoading(true);
                        let result = await getUserByname(username);
                        console.log(result);
                        if(!result || result === false){
                            var OTP = Math.ceil(Math.random()*1000000);
                            
                            
                            
                            
                            settimer(90);
                            setoptCode(OTP);
                            setisLoading(false);
                            setoptPage(true);
                        }
                        else{
                            setisLoading(false);
                            setError("User name already exists");
                            

                            setTimeout(() => {
                                setError("");
                            },5000)
                            return;
                        }
                    }}>{isloading ? "Loading..." : "Next"}</button>

                            
                    <Link to="/login">Already Have an account</Link>
                            
                </div>
                :
                <div className={"box-content-dimension mb-5"+(isloading ? " loading" : "")}>
                    <h1>{renderer(timer)}</h1>
                    <p>Change the first name of your codeForces handle to this "<b>{optCode}</b>" (Without Quote).</p>
                    <button className={isloading ? " loading" : ""} onClick={async () => {
                        setisLoading(true);
                        let result = await getFirstName(username);
                        
                        if(parseInt(result) !== parseInt(optCode)){
                            setisLoading(false);
                            init();
                            setError("Unable to verify");
                            setoptPage(false);
                            setTimeout(() => {
                                setError("");
                            },5000)
                        }
                        else{
                            let register = await registrationProcess(username,password,country,institution,bio);
                            if(!register || register===false){
                                setisLoading(false);
                                init();
                                setError("Unable to Register");
                                setoptPage(false);
                            }
                            else{
                                setisLoading(false);
                                init();
                                setError("");
                                setoptPage(false)
                                setTimeout(() => {
                                    setError("");
                                },5000)
                                window.location = "/login";
                            }
                        }
                    }}>{isloading ? "Verifying..." : "Verify"}</button>
                    <Link to="/login">Already Have an account</Link>
                </div>
                }
            </div>

            
            
        </div>
    )
}

export default RegisterPage;
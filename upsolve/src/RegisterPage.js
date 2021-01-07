
import fetch from 'node-fetch';
import React, { useState } from 'react';
import {getUserByname} from './Api/problem.api'
import NavigationMenu from './NavigationMenu';
import BoxTitle from './BoxTitile';



    



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
                
                <div className={"box-content-dimension mb-5"+ (isloading ? " loading" : "")}>
                    <div className="box-form p-4">
                        
                            <div class="form-group">
                                <label>Username:</label>
                                <input type="text" className="form-control" placeholder="Enter codeForces Handle" onChange={(e) => {setusername(e.target.value)}} required />
                                {username === "" ? <div class="text-danger">Please fill out this field.</div> : ''}
                            </div>
                            <div class="form-group">
                                <label>Country: <select onChange={(e) => {setcountry(e.target.value)}}>
                                                    <option value="India">India</option>
                                                </select>
                                </label>
                                
                            </div>
                            <div class="form-group">
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
                                {}
                            </div>
                            
                        
                    </div>
                    <button type="submit" className="shadow" onClick={async () => {
                                if(validatePassword !== true || username === "" || password !== confirmpassword){return}
                                setisLoading(true);
                                let result = await getUserByname(username);
                                console.log(result);
                                if(!result || result === false){
                                    var OTP = Math.ceil(Math.random()*1000000);
                                    setError("Please Update Your FirstName with "+OTP);
                                    
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
                </div>
                
            </div>

            
            
        </div>
    )
}

export default RegisterPage;
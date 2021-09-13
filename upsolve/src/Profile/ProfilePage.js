import React,{useRef,useState} from 'react';
// let LineChart = require('react-chartjs').Line
import Chart from 'react-apexcharts';
import {updateUser} from '../Api/auth.api';
function  ProfilePage(props) {

    const country_list = require('country-list');
    let countries = [];
    country_list.getNames().map((country) => {
        countries.push(<option value={country}>{country}</option>)
    })
    console.log(props)
    const [isloading,setisloading] = useState(false);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const bio = useRef(null);
    const CountryRef = useRef(null);
    const institutionRef = useRef(null);
    let problems = [];
    let series= [{
        name: 'Upsolved',
        data: []
      }];
     let options= {
        grid:{
            show: false,
        },
        
        chart: {
            
          type: 'area',
          stacked: false,
          height: 350,
          animations:{
              enabled:true,
          },
          
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 5,
        },
        title: {
          text: 'Upsolved Questions',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          title: {
            text: 'Number of Questions'
          },
          min:0
        },
        xaxis: {
         
          formate: "D-MM-YYYY"
        },
        tooltip: {
          shared: false,
        },
        stroke:{
            curve: 'straight'
        }
      };   
    
     
    let maxUpsolved = parseInt(0);
    let UpsolveQuestion = props.user.UpsolveStreak;
    
    if(UpsolveQuestion && UpsolveQuestion !== null && UpsolveQuestion !== undefined){
        Object.keys(UpsolveQuestion).map((key,i) => {
            let problemDescription = [];
            series[0].data.push({'x': key,'y': UpsolveQuestion[key].length});
            maxUpsolved = Math.max(maxUpsolved,UpsolveQuestion[key].length);
            UpsolveQuestion[key].forEach((value) => {
                if(value.contestId){
                    value.contestLink = "https://codeforces.com/contest/"+value.contestId;
                    value.problemLink = "https://codeforces.com/contest/"+value.contestId+"/problem/"+value.index;
                }
                
                problemDescription.push(
                    <div className="row offset-0 p-lg-1 p-md-1 offset-md-1 offset-lg-1 ml-0" style={{fontSize: "1rem",fontFamily: "open-sans",fontWeight: "600",width: "100%"}}>
                                
                        <p className="text-center col-4 col-md-5 col-lg-6 m-auto" style={{whiteSpace:"nowrap",overflowX: "hidden",textOverflow: "ellipsis"}}>{value.name ? <a href={value.problemLink} target="_blank">{value.name}</a> : "-"}</p>
                        <p className="text-center col-4 col-md-3 col-lg-3 m-auto">{value.contestId ? <a href={value.contestLink} target="_blank">{value.contestId}</a> : "-"}</p>
                        <p className="text-center col-4 col-md-3 col-lg-3 m-auto">{value.rating ? value.rating : "-"}</p>
                    </div>
                )
            })
            problems.unshift(
                <li id={"#"+key} class="timeline-sm-item pl-1">
                
                    <span class="timeline-sm-date">{key}</span>
                    <div className="row p-0 pt-3 pl-0 d-flex justify-content-between align-items-center flex-column">
                        {problemDescription}
                    </div>
                </li>
            )
            
        })
    }
    return(
        
        <div class="container mt-4">
        <div class="row">
            <div class="col-lg-4 col-xl-4">
                <div class="card-box text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle avatar-xl img-thumbnail" alt="profile-image" />
        
                    <h4 class="mb-0">{props.user.username}</h4>
                    
        
                    <div class="text-left mt-3">
                        <h4 class="font-13 text-uppercase">About Me :</h4>
                        <p class="text-muted font-13 mb-3">
                            {props.user.bio ? props.user.bio : "A passionate programmer"}
                        </p>
                        <p class="text-muted mb-2 font-13"><strong>Full Name :</strong> <span class="ml-2">{props.user.name ? props.user.name : "-"}</span></p>
        
                        
        
                        <p class="text-muted mb-2 font-13"><strong>Institution :</strong> <span class="ml-2 ">{props.user.institution ? props.user.institution : "-"}</span></p>
        
                        <p class="text-muted mb-1 font-13"><strong>Location :</strong> <span class="ml-2">{props.user.country ? props.user.country : "-"}</span></p>
                        <p class="text-muted mb-1 font-13"><strong>Max-Upsolved :</strong> <span class="ml-2 text-success">{parseInt(maxUpsolved)}</span></p>
                        <p class="text-muted mb-1 font-13"><strong>Streak :</strong> <span class="ml-2 text-success">{parseInt(props.user.streak ? props.user.streak : "0")}</span></p>
                    </div>
        
                
                </div> 
        

        
            </div> 
            <div class="col-lg-8 col-xl-8">
                <div class="card-box">
                
                    <ul class="nav nav-pills navtab-bg">
                        <li class="nav-item">
                            <a href="#about-me" data-toggle="tab" aria-expanded="true" class="nav-link ml-0 active">
                                Graph
                            </a>
                        </li>
                        {props.loggedinUser === true ?
                        <li class="nav-item">
                            <a href="#settings" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <i class="mdi mdi-settings-outline mr-1"></i>Settings
                            </a>
                        </li>
                        :
                        ''
                        } 
                    </ul>
                          
                    <div class="tab-content">
                        
                        <div class="tab-pane show active pt-5" id="about-me">

                        
                       
                        <Chart options={options} series={series} type="area" height={350} />

    
                        </div>
                        
                        {/* <div class="tab-pane" id="settings"><h1>Hello</h1></div> */}
                         {props.loggedinUser === true ?
                         <div class="tab-pane" id="settings">
                            <form>
                                <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-account-circle mr-1"></i> Personal Info</h5>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="firstname">First Name</label>
                                            <input type="text" ref={firstName} class="form-control" id="firstname" defaultValue={props.user.name ? props.user.name.split(' ')[0] : ''} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="lastname">Last Name</label>
                                            <input type="text" ref={lastName} class="form-control" id="lastname" defaultValue={props.user.name ? props.user.name.split(' ')[1] : ''} />
                                        </div>
                                    </div> 
                                </div> 
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="userbio">Bio</label>
                                            <textarea class="form-control" ref={bio} id="userbio" rows="4" defaultValue={props.user.bio ? props.user.bio : "Write Something About yourself"}></textarea>
                                        </div>
                                    </div> 
                                </div> 
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="Country">Country</label>
                                            <select  class="form-control" ref={CountryRef} id="Country" >
                                                <option defaultValue={props.user.country}>{props.user.country}</option>
                                                {countries}
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="institution">Institution</label>
                                            <input type="text" ref={institutionRef} class="form-control" id="institution" value={props.user.institution}  />
                                            
                                        </div>
                                    </div> 
                                </div> 
                                
                                
                                <div class="text-right">
                                    <button type="submit" onClick={async (e)=> {
                                        e.preventDefault();
                                        setisloading(true);
                                        await updateUser(props.user.username,firstName.current.value,lastName.current.value,CountryRef.current.value,institutionRef.current.value,bio.current.value)
                                        setisloading(false);
                                        window.location.reload();
                                        }} class="btn btn-success waves-effect waves-light mt-2"><i class="mdi mdi-content-save" ></i> {isloading ? "Saving..." : "Save"}</button>
                                </div>
                            </form>
                        </div>
                        :
                        ''
                        }      
                    </div>  
                </div> 
        
            </div> 

            <div className="row card-box col-12 mb-4">
                <div className="col-12 col-md-11 col-lg-11">
                        <h5 class="mb-4 text-uppercase"><i class="mdi mdi-briefcase mr-1"></i>
                            Upsolved Question</h5>
        
                            <ul class="list-unstyled timeline-sm" style={{maxHeight: "100%",overflowY:"scroll",width: "100%"}}>
                                <li>
                                
                                        <div className="row mb-2 ml-3 p-1 pr-1 pl-2 p-lg-2 p-md-2 offset-md-1 offset-lg-1" style={{backgroundColor: "#f1f5f7",borderColor: "#dee2e6",fontSize: "1rem",fontFamily: "open-sans",fontWeight: "600",color: "#6c757d",minWidth: "90%"}}>
                                            
                                            <p className="text-center col-3 col-md-5 col-lg-6 m-auto ml-0">Name</p>
                                            <p className="text-center col-4 col-md-3 col-lg-3 m-auto">ConestId</p>
                                            <p className="text-center col-4 col-md-3 col-lg-3 m-auto ml-5">Rating</p>
                                        </div>
                                    
                                        
                                </li>
                                {problems}
                                
                            </ul> 
                </div>
            </div>
        </div>
        </div>
        
    
    
    )
}

export default ProfilePage;
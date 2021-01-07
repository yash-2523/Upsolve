import React from 'react';
// let LineChart = require('react-chartjs').Line
import Chart from 'react-apexcharts';
function  ProfilePage(props) {

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
          text: 'Stock Price Movement',
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
            text: 'Price'
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
                            Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type.
                        </p>
                        <p class="text-muted mb-2 font-13"><strong>Full Name :</strong> <span class="ml-2">Nik G. Patel</span></p>
        
                        
        
                        <p class="text-muted mb-2 font-13"><strong>Email :</strong> <span class="ml-2 ">{props.user.email}</span></p>
        
                        <p class="text-muted mb-1 font-13"><strong>Location :</strong> <span class="ml-2">USA</span></p>
                        <p class="text-muted mb-1 font-13"><strong>Max-Upsolved :</strong> <span class="ml-2 text-success">{parseInt(maxUpsolved)}</span></p>
                    </div>
        
                    <ul class="social-list list-inline mt-3 mb-0">
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-purple text-purple"><i class="fab fa-facebook"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="fab fa-google"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="fab fa-twitter"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="fab fa-github"></i></a>
                        </li>
                    </ul>
                </div> 
        

        
            </div> 
            <div class="col-lg-8 col-xl-8">
                <div class="card-box">
                    <ul class="nav nav-pills navtab-bg">
                        <li class="nav-item">
                            <a href="#about-me" data-toggle="tab" aria-expanded="true" class="nav-link ml-0 active">
                                <i class="mdi mdi-face-profile mr-1"></i>About Me
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#settings" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <i class="mdi mdi-settings-outline mr-1"></i>Settings
                            </a>
                        </li>
                    </ul>
        
                    <div class="tab-content">
                        
                        <div class="tab-pane show active pt-5" id="about-me">

                        
                       
                        <Chart options={options} series={series} type="area" height={350} />

    
                        </div>
                        
                        <div class="tab-pane" id="settings"><h1>Hello</h1></div>
                        {/* <div class="tab-pane" id="settings">
                            <form>
                                <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-account-circle mr-1"></i> Personal Info</h5>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="firstname">First Name</label>
                                            <input type="text" class="form-control" id="firstname" placeholder="Enter first name" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="lastname">Last Name</label>
                                            <input type="text" class="form-control" id="lastname" placeholder="Enter last name" />
                                        </div>
                                    </div> 
                                </div> 
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="userbio">Bio</label>
                                            <textarea class="form-control" id="userbio" rows="4" placeholder="Write something..."></textarea>
                                        </div>
                                    </div> 
                                </div> 
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="useremail">Email Address</label>
                                            <input type="email" class="form-control" id="useremail" placeholder="Enter email" />
                                            <span class="form-text text-muted"><small>If you want to change email please <a href="javascript: void(0);">click</a> here.</small></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="userpassword">Password</label>
                                            <input type="password" class="form-control" id="userpassword" placeholder="Enter password" />
                                            <span class="form-text text-muted"><small>If you want to change password please <a href="javascript: void(0);">click</a> here.</small></span>
                                        </div>
                                    </div> 
                                </div> 
                                <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-office-building mr-1"></i> Company Info</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="companyname">Company Name</label>
                                            <input type="text" class="form-control" id="companyname" placeholder="Enter company name" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="cwebsite">Website</label>
                                            <input type="text" class="form-control" id="cwebsite" placeholder="Enter website url" />
                                        </div>
                                    </div> 
                                </div> 
        
                                <h5 class="mb-3 text-uppercase bg-light p-2"><i class="mdi mdi-earth mr-1"></i> Social</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-fb">Facebook</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-facebook-square"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-fb" placeholder="Url" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-tw">Twitter</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-twitter"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-tw" placeholder="Username" />
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
        
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-insta">Instagram</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-instagram"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-insta" placeholder="Url" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-lin">Linkedin</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-lin" placeholder="Url" />
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-sky">Skype</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-skype"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-sky" placeholder="@username" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="social-gh">Github</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fab fa-github"></i></span>
                                                </div>
                                                <input type="text" class="form-control" id="social-gh" placeholder="Username" />
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                                
                                <div class="text-right">
                                    <button type="submit" class="btn btn-success waves-effect waves-light mt-2"><i class="mdi mdi-content-save"></i> Save</button>
                                </div>
                            </form>
                        </div>*/}
        
                    </div>  
                </div> 
        
            </div> 

            <div className="row card-box col-12 mb-4">
                <div>
                        <h5 class="mb-4 text-uppercase"><i class="mdi mdi-briefcase mr-1"></i>
                            Experience</h5>
        
                            <ul class="list-unstyled timeline-sm" style={{maxHeight: "1000px",overflow:"scroll"}}>
                                <li>
                                
                                        <div className="row mb-2 ml-3 p-1 pr-1 pl-2 p-lg-2 p-md-2 offset-md-1 offset-lg-1" style={{backgroundColor: "#f1f5f7",borderColor: "#dee2e6",fontSize: "1rem",fontFamily: "open-sans",fontWeight: "600",color: "#6c757d"}}>
                                            
                                            <p className="text-center col-4 col-md-5 col-lg-6 m-auto">Name</p>
                                            <p className="text-center col-4 col-md-3 col-lg-3 m-auto">ConestId</p>
                                            <p className="text-center col-4 col-md-3 col-lg-3 m-auto">Rating</p>
                                        </div>
                                    
                                        
                                </li>
                                {problems}
                                <li class="timeline-sm-item">
                                    <span class="timeline-sm-date">2012 - 15</span>
                                    <h5 class="mt-0 mb-1">Senior Graphic Designer</h5>
                                    <p>Software Inc.</p>
                                    <p class="text-muted mt-2">If several languages coalesce, the grammar
                                        of the resulting language is more simple and regular than that of
                                        the individual languages. The new common language will be more
                                        simple and regular than the existing European languages.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-12">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                                <li class="timeline-sm-item" id="2010-22">
                                    <span class="timeline-sm-date">2010 - 12</span>
                                    <h5 class="mt-0 mb-1">Graphic Designer</h5>
                                    <p>Coderthemes LLP</p>
                                    <p class="text-muted mt-2 mb-0">The European languages are members of
                                        the same family. Their separate existence is a myth. For science
                                        music sport etc, Europe uses the same vocabulary. The languages
                                        only differ in their grammar their pronunciation.</p>
                                </li>
                            </ul> 
                </div>
            </div>
        </div>
        </div>
        
    
    
    )
}

export default ProfilePage;
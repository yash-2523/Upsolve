
import { useEffect, useState } from 'react';
import '../App.css';
import Leaderboard from './leaderboard';

import Skeleton from '@material-ui/lab/Skeleton'
import NavigationMenu from '../NavigationMenu';

function LeaderboardPage() {
    const country_list = require('country-list');
    let countries = [];
    country_list.getNames().map((country) => {
        countries.push(<option value={country}>{country}</option>)
    })
    const [filter,setfilter] = useState({country:'',institution: '',username:''});
    
    
    
  return (
    <div className="App">
        
        {<NavigationMenu></NavigationMenu> || <Skeleton width="100%" height="2rem"></Skeleton>}
        <section class="Leaderboard">

                <div class="container-fluid leaderboard-container col-lg-8 col-md-6 col-11">
                    <div class="leaderboard-title">
                        <p>Leaderboard</p>
                    </div>
                    <div class="leaderboard-table">
                        
                    <Leaderboard filter={filter} /> 
                        
                        

                        
                    </div>
                </div>
                <div class="container-fluid col-lg-3 col-md-4 col-11 filters">
                    <div class="filter-title">
                        <p>Filter</p>
                    </div>
                    <div class="filter-form row">
                        <form action="#">
                            <label for="country">Country: </label>
                            <select name="country" onChange={(e)=> {setfilter({...filter,country:e.target.value})}} class="col-7" id="country">
                                <option value="">Any</option>
                                {countries}
                            </select>
                            <label for="institution">Institution: </label>
                            <select name="institution" onChange={(e)=> {setfilter({...filter,institution:e.target.value})}} class="col-7" id="institution">
                                <option value=""></option>
                                <option value="India">India</option>
                                <option value="India">India</option>
                            </select>
                            <label for="username">Username: </label>
                            <input type="text" name="username" onChange={(e)=> {setfilter({...filter,username:e.target.value})}} class="col-7" id="username"/>
                            {/* <input type="submit" class="btn-primary" value="Submit"/> */}
                        </form>
                    </div>
                </div>
        
        </section>
    </div>
  );
}

export default LeaderboardPage;

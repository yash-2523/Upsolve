
import './App.css';
import Leaderboard from './leaderboard';

function App() {

    

    

  return (
    <div className="App">
        <section class="navigation-menu">
        <div class="nav-bar col-12 shadow">
            <p class="text-center">Upsolve</p>
            <div class="nav-items col-lg-3 col-6 text-center">
                <a href="#" class="back-btn" data-toogle="tooltip" data-palcement="bottom" title="Back">
                    <div>
                        <i class="fa fa-rocket"></i>
                    </div>
                </a>
                <a href="#" data-toogle="tooltip" data-palcement="bottom" title="Login/Register">
                    <div>
                        <i class="fa fa-user"></i>
                    </div>
                </a>

            </div>
        </div>
    </section>

    <section class="Leaderboard">

            <div class="container-fluid leaderboard-container col-lg-8 col-md-6 col-11">
                <div class="leaderboard-title">
                    <p>Leaderboard</p>
                </div>
                <div class="leaderboard-table">
                    
                 <Leaderboard />  
                    
                    

                    
                </div>
            </div>
            <div class="container-fluid col-lg-3 col-md-4 col-11 filters">
                <div class="filter-title">
                    <p>Filter</p>
                </div>
                <div class="filter-form row">
                    <form action="#">
                        <label for="country">Country: </label>
                        <select name="country" class="col-7" id="country">
                            <option value="default"></option>
                            <option value="India">India</option>
                            <option value="India">India</option>
                        </select>
                        <label for="institution">Institution: </label>
                        <select name="institution" class="col-7" id="institution">
                            <option value="default"></option>
                            <option value="India">India</option>
                            <option value="India">India</option>
                        </select>
                        <label for="username">Username: </label>
                        <input type="text" name="username" class="col-7" id="username"/>
                        <input type="submit" class="btn-primary" value="Submit"/>
                    </form>
                </div>
            </div>
    
    </section>
    </div>
  );
}

export default App;

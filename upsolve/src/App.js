import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import LeaderboardPage from './Leaderboard/LeaderboardPage';
import Challenge from './Challenge/Challenge'
import LoginPage from './loginPage';
import HomePage from './HomePage';
import LogoutPage from './LogoutPage';
import ErrorPage from './ErroPage';
import ProfileRoute from './Profile/ProfileRoute';
import RegisterPage from './RegisterPage';

function App() {

    return(
        <Router>
            <Switch>
                <Route exact path="/leaderboard" component={LeaderboardPage}></Route>
                <Route exact path="/challenge" component={Challenge}></Route>
                <Route exact path="/login" component={LoginPage}></Route>
                <Route exact path="/register" component={RegisterPage}></Route>
                <Route exact path="/logout" component={LogoutPage}></Route>
                <Route exact path="/profile/:username" component={ProfileRoute}></Route>
                <Route exact path="/" component={HomePage}></Route>
                <Route component={ErrorPage}></Route>
            </Switch>
        </Router>
    );


}

export default App;

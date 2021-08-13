import logo from './logo.svg';
import './App.css';
import CreateMeeting from './pages/createMeeting';
import JoinMeeting from './pages/joinMeeting';
import { Link, Switch, Route } from 'react-router-dom';
import './index.css';
import { Typography, Button } from '@material-ui/core';

function App() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <CreateMeeting />
                </Route>
                <Route path="/joinMeeting">
                    <JoinMeeting />
                </Route>
            </Switch>
        </div>
    );
}

export default App;

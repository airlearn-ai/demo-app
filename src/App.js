import './App.css';
import CreateMeeting from './pages/addMeeting';
import JoinMeeting from './pages/joinMeeting';
import { Switch, Route } from 'react-router-dom';
import './index.css';

function App() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <CreateMeeting />
                </Route>                           
                <Route exact path="/n/:meetingId" component={JoinMeeting} >
                </Route>
            </Switch>
        </div>
    );
}

export default App;

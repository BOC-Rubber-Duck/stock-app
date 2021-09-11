import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login.jsx';
import Trade from './Trade.jsx';
import Leaderboard from './Leaderboard.jsx';
import Navbar from './Navbar.jsx';
import Portfolio from './Portfolio.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Portfolio />
        <React.Fragment>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login/Signup</Link>
                </li>
                <li>
                  <Link to="/trade">Trade</Link>
                </li>
                <li>
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/trade" component={Trade} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <Navbar />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
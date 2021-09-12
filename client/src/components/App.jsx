import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Portfolio from './Portfolio.jsx';
import Login from './Login.jsx';
import Leaderboard from './Leaderboard.jsx';
import Trade from './Trade.jsx';
import StockSearch from './StockSearch.jsx';
import Navbar from './Navbar.jsx';
import StockDetail from './StockDetail.jsx';

import Searchbar from './Searchbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        cashBalance: 0,
        rank: null,
        userPortfolio: [
          // {
          //   stockName:
          //   sharesOwned
          // }
        ],
        friends: [
          // username, username
        ]
      },
      sessionInfo: {}, // need to be populated with passport
      selectedFriend: {
        username: '',
        rank: 0,
        portfolioValue: 0,
        selectedFriendPortfolio: [
        //  {
        //     stockName:
        //     sharesOwned
        //   },
        //   {}
        ]
      },
      stockSelected: {
        name: '',
        symbol: '',
        price: null,
        data: [
          // {},{}
        ]
      }
    };
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          {/* <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login/Signup</Link>
                </li>
                <li>
                  <Link to="/trade">Trade</Link>
                </li>
              </ul>
            </nav>
          </div> */}
          <Switch>
            <Route exact path="/" component={Leaderboard} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/stock-search" component={StockSearch} />
            <Route exact path="/trade" component={Trade} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/stock-detail" component={StockDetail} />
          </Switch>
          <Navbar />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
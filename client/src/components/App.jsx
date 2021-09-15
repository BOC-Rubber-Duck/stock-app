import React from 'react';
import axios from 'axios';
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
import Friend from './Friend.jsx';
import StockDetailPage from './StockDetailPage.jsx';
import Searchbar from './Searchbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        username: 'bezos_the_first',
        email: '',
        cashBalance: 200000,
        rank: 1,
        userPortfolio: [
          {
            stockName: 'Amazon.com, Inc.',
            stockSymbol: 'AMZN',
            valueOwned: 350000
          },
          {
            stockName: 'Telsa, Inc.',
            stockSymbol: 'TSLA',
            valueOwned: 300000
          },
          {
            stockName: 'Apple',
            stockSymbol: 'AAPL',
            valueOwned: 200000
          },
          {
            stockName: 'StockDucks, Inc.',
            stockSymbol: 'STKD',
            valueOwned: 200000
          }
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
        name: 'Tesla',
        symbol: 'TSLA',
        price: 100,
        data: [
          // {},{}
        ]
      }
    };

    this.fetchSelectedStock = this.fetchSelectedStock.bind(this);
    this.handleTrade = this.handleTrade.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  selectedUserSearch(username) {
    // Tyler?
    // need to get pricing for each stock in their portfolio, check server route/helper functions
    this.setState({
      // selectedFriend: {
      //   username: '',
      //   rank: 0,
      //   portfolioValue: 0,
      //   selectedFriendPortfolio: [
      //   //  {
      //   //     stockName:
      //   //     sharesOwned
      //   //   },
      //   //   {}
      //   ]
      // },
    });
  };

  getLeaderboard() {
    // get most recent users
    // update stock prices?
  };

  handleTrade(stockSymbol, shares, action) {
    console.log('handleTrade method called');
    // axios call:
    axios.post('/trade', {
      stockSymbol: stockSymbol,
      shares: shares,
      action: action
    })
      .then((response) => {
        console.log('response to trade POST query:', response);
      })
      .error((err) => {
        console.log('error in attempting trade', err);
      });
    // let message = response.status == 200 ? 'success': `failed to perform trade, error: ${error}`;
    // return message;
  };

  getCurrentUser(user) {
    // in conjunction with passport auth? Should only be able to fetch own info.
    let self = true;
    if (user === undefined) {
      user = 'the_zuck';
    } else {
      self = false;
    }
    let portfolio = [];
    let friends = [];
    axios.get('/api/getPortfolio?username='+user)
      .then((results) => {
        portfolio = results.data;
        axios.get('/api/getFriends?username='+user)
          .then((results) => {
            friends = results.data;
            axios.get('/api/getUser?username='+user)
              .then((result) => {
                let { first_name, last_name, username, email, cash_position } = result.data;
                if (self) {
                  this.setState({
                    user: {
                      first_name: first_name,
                      last_name: last_name,
                      username: username,
                      email: email,
                      cashBalance: cash_position,
                      userPortfolio: portfolio,
                      friends: friends
                    }
                  });
                  console.log(this.state);
                } else {
                // add to some other user in the state
                  let others = {};
                  if (this.state.others) {
                    others = this.state.others;
                    others[username] = {
                      first_name: first_name,
                      last_name: last_name,
                      username: username,
                      email: email,
                      cashBalance: cash_position,
                      userPortfolio: portfolio,
                      friends: friends
                    };
                    this.setState({
                      others: others
                    });
                  }
                }
              });
          });
      });
  }

  fetchSelectedStock(symbol) {
    console.log(`Stock ${symbol} clicked!`);
    // TODO: ajax calls to external service
    // returns 1 year of data, use first response[0] for "up to date" for display purposes
    // this.setState({
    //   stockSelected: {
    //     name: 'Tesla',
    //     symbol: 'TSLA',
    //     price: 45.99,
    //     data: [
    //       {},{}
    //     ]
    //   },
    // });
    axios.get('/fetchSelectedStock', {
      params: {
        symbol
      }
    })
      .then((res) => {
        let stockSelected = res.data;
        console.log('got response from server with data!', res.data);
      });
  };

  render() {
    return (
      <Router>
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
                <li>
                  <Link to="/stock-detail-page">Stock Detail Page</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" component={Leaderboard} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/portfolio"
              render={() =>
                <Portfolio user={this.state.user} onStockClick={this.fetchSelectedStock}/>
              }/>
            <Route exact path="/stock-search" component={StockSearch} />
            <Route exact path="/trade"
              render={() =>
                <Trade
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handleTrade={this.handleTrade}
                />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/friend" component={Friend} />
            <Route exact path="/stock-detail-page" component={StockDetailPage}/>
            <Route
              exact path="/stock-detail-page"
              render={() =>
                <StockDetailPage
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                />}
            />
          </Switch>
          <Navbar />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
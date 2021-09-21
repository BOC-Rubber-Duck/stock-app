/* eslint-disable camelcase */
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
import Navbar from './Navbar.jsx';
import Friend from './Friend.jsx';
import StockDetailPage from './StockDetailPage.jsx';
import Searchbar from './Searchbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
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
        name: 'Tesla',
        symbol: 'TSLA',
        price: 100,
        data: [
          // {},{}
        ]
      },
      trade: {
        action: 'sell'
      }
    };

    this.fetchSelectedStock = this.fetchSelectedStock.bind(this);
    this.handleTrade = this.handleTrade.bind(this);
    this.selectedUserSearch = this.selectedUserSearch.bind(this);
    this.updateTradeAction = this.updateTradeAction.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  updateTradeAction(action) {
    this.setState({
      trade: { action }
    });
  }

  selectedUserSearch(username) {
    console.log('selectedUserSearch clicked: ', username);
    let selectedFriendPortfolio = [];
    let portfolioValue= 0;
    axios.get('/api/getPortfolio', {
      params: {
        username
      }
    })
      .then((res) => {
        const dbPortfolioData = res.data;

        dbPortfolioData.map((stock) => {
          const stockName = stock.ticker_symbol;
          const tickerSymbol = stock.ticker_symbol;
          //needs name
          //does not need shares owned
          const sharesOwned = stock.amount;
          const reducedData = {
            stockName,
            sharesOwned,
            tickerSymbol
          };
          selectedFriendPortfolio.push(reducedData);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    axios.get(//routed to leaderboard,
      //pull the portfolio value, and rank for leaderboard query

      )

      const selectedFriend = {
        username,
        rank: 1,//query all users and filter and sort based on portfolio value, return index?
        portfolioValue,
        selectedFriendPortfolio
      }
    // Tyler?
    // need to get pricing for each stock in their portfolio, check server route/helper functions
    //for username
      //get portfolio
    this.setState({
      selectedFriend
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
    }, console.log(this.state));
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
                const { id, first_name, last_name, username, email, cash_position } = result.data;
                if (self) {
                  this.setState({
                    user: {
                      id: id,
                      first_name: first_name,
                      last_name: last_name,
                      username: username,
                      email: email,
                      cashBalance: cash_position,
                      userPortfolio: portfolio,
                      friends: friends
                    }
                  });
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
      })
      .catch((e) => e);
  }

  fetchSelectedStock(symbol) {
    axios.get('/fetchSelectedStock', {
      params: {
        symbol
      }
    })
      .then((res) => {
        const stockSelected = res.data;
        this.setState({
          stockSelected
        });
      })
      .catch((e) => console.log(e));
  };

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
                <li>
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li>
                  <Link to="/stock-detail-page">Stock Detail Page</Link>
                </li>
              </ul>
            </nav>
          </div> */}

          <Switch>
          <Route exact path="/"
              render={() =>
                <Leaderboard
                  user={this.state.user}
                />
              }/>
            <Route exact path="/leaderboard"
              render={() =>
                <Leaderboard
                  user={this.state.user}
                />
              }/>
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/stock-search"
              render={() =>
                <Searchbar
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handlePredictionClick={this.fetchSelectedStock}
                  updateTradeAction={this.updateTradeAction}
                />
              }
            />
            <Route exact path="/trade"
              render={() =>
                <Trade
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handleTrade={this.handleTrade}
                  action={this.state.trade.action}
                />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/friend" component={Friend} />
          </Switch>
          <button className='test-button' onClick={() => this.selectedUserSearch('the_zuck')}>Click mee</button>
          <Navbar />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
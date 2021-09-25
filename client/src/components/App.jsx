/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import Portfolio from './Portfolio/Portfolio.jsx';
import Login from './Login.jsx';
import Leaderboard from './Leaderboard.jsx';
import Trade from './Trade/Trade.jsx';
import Navbar from './Navbar.jsx';
import Friend from './Friend.jsx';
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
        rank: 0,
        userPortfolio: [
          {
            amount: 0,
            exchange: "nasdaq",
            id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
            ticker_symbol: "fb",
            user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13"
          }
        ],
        friends: [
          // username, username
        ]
      },
      sessionInfo: {}, // need to be populated with passport
      selectedFriend: {
        id: '',
        first_name: '',
        last_name: '',
        username: 'selectedFriendDefault',
        email: '',
        cashBalance: 10,
        portfolioValue: 0,
        rank: 0,
        userPortfolio: [],
        friends: []
      },
      stockSelected: {
        name: '',
        symbol: '',
        price: null,
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
    this.exitButton = this.exitButton.bind(this);
  }

  componentDidMount() {
    axios.get('/api/whoami')
      .then((res) => {
        if (res.data.username) {
          this.getCurrentUser(res.data.username, true);
        }
      })
      .catch((e) => e);
  }

  updateTradeAction(action) {
    this.setState({
      trade: { action }
    });
  }

  selectedUserSearch(username) {
    // this is temp
    const portfolioValue= Math.floor(Math.random() * 10000000);
    axios.get('/api/getPortfolio', {
      params: {
        username
      }
    })
      .then((res) => {
        const portfolio = [];
        const dbPortfolioData = res.data;
        dbPortfolioData.map((stock) => {
          const tickerSymbol = stock.ticker_symbol;
          portfolio.push(
            axios.get('/userStockSearch', {
              params: {
                userStockSearch: tickerSymbol
              }
            })
          );
        });
        Promise.all(portfolio)
          .then((res) => {
            const selectedFriendPortfolio = res.map((r) => {
              return r.data[0];
            });
            return selectedFriendPortfolio;
          })
          .then((selectedFriendPortfolio) => {
            axios.get('/api/getRank', {
              params: {
                username
              }
            })
              .then((res) => {
                const rank = res.data[0].rank;
                const portfolioValue = res.data[0].portfolio_value;
                const cashBalance = res.data[0].cash_position;
                const selectedFriend = {
                  username,
                  rank,
                  portfolioValue,
                  cashBalance,
                  selectedFriendPortfolio
                };
                this.setState({
                  selectedFriend
                });
              })
              .catch((e) => e);
          })
          .catch((e) => e);
      })
      .catch((e) => e);
  }

  getLeaderboard() {
    // get most recent users
    // update stock prices?
  };

  handleTrade(currentUser, stockSymbol, shares, action) {
    // axios call:
    return axios.post('/api/trade', {
      user: currentUser,
      stockSymbol: stockSymbol,
      shares: shares,
      action: action
    })
      .then((response) => {
        console.log('response to trade POST query:', response);
        return response;
      })
      .error((err) => {
        console.log('error in attempting trade', err);
        return err;
      });
    // let message = response.status == 200 ? 'success': `failed to perform trade, error: ${error}`;
    // return message;
  };

  getCurrentUser(user, mount = false) {
    // in conjunction with passport auth? Should only be able to fetch own info.
    let self = true;
    if (this.state.user.username === '' && mount === true) {
      user = user;
    } else {
      self = false;
    }
    let portfolio = [];
    let friends = [];
    var rank = 0;
    axios.get('/api/getRank', {
      params: {
        'username': user
      }
    })
      .then((res) => {
        rank = res.data[0].rank;
        axios.get('/api/getPortfolio?username='+user)
          .then((results) => {
            portfolio = results.data;
            axios.get('/api/getFriends?username='+user)
              .then((results) => {
                friends = results.data;
                axios.get('/api/getUser?username='+user)
                  .then((result) => {
                    const { id, first_name, last_name, username, email, cash_position, portfolio_value } = result.data;
                    var user = {
                      id: id,
                      first_name: first_name,
                      last_name: last_name,
                      username: username,
                      email: email,
                      cashBalance: cash_position,
                      portfolioValue: portfolio_value,
                      userPortfolio: portfolio,
                      rank: rank,
                      friends: friends
                    };
                    if (self) {
                      this.updatePortfolioValue(user)
                        .then((updatedUser) => {
                          this.setState({
                            'user': updatedUser
                          }, () => {
                          });
                        })
                        .catch((err) => {
                          console.log('error updating portfolioValue', err);
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
                    };
                  });
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

  updatePortfolioValue(user) {
    const stocks = user.userPortfolio;
    const stockData = stocks.slice();
    user.portfolioValue = 0;

    return new Promise((resolve, reject) => {
      axios.all(stockData.map((stock) =>
        axios.get('/fetchSelectedStock', {
          params: {
            'symbol': stock.ticker_symbol
          }
        })
      ))
        .then(axios.spread((...responses) => {
          for (var i = 0; i < responses.length; i++) {
            stocks[i].stockName = responses[i].data.name;
            stocks[i].valueOwned = stocks[i].amount * responses[i].data.price;
            user.portfolioValue += stocks[i].valueOwned;
          }
          axios.put('/api/portfolioValue', {'user_id': user.id, 'portfolio_value': user.portfolioValue * 100}).then((queryResults) => {
            resolve(user);
          }).catch((err) => {
            console.log('error writing portfolioValue to db:', err);
            resolve(user);
          });
        }))
        .catch((err) => {
          reject(err);
        });
    });
  };

  exitButton() {
    let history = useHistory();
    history.push('/');
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
          </div>*/}

          <Switch>
            <Route exact path="/"
              render={() =>
                <Portfolio
                  user={this.state.user} self={true} handleStockClick={this.fetchSelectedStock}
                />
              }/>
            <Route exact path="/leaderboard"
              render={() =>
                <Leaderboard
                  user={this.state.user} handleFriendClick={this.selectedUserSearch}
                />
              }/>
            <Route exact path="/portfolio"
              render={() =>
                <Portfolio user={this.state.user} handleStockClick={this.fetchSelectedStock} self={true}/>
              }/>
            <Route exact path="/friendPortfolio"
              render={() =>
                <Portfolio user={this.state.selectedFriend} handleStockClick={this.fetchSelectedStock} self={false}/>
              }/>
            <Route exact path="/stock-search"
              render={() =>
                <Searchbar
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handlePredictionClick={this.fetchSelectedStock}
                  userPortfolio={this.state.user.userPortfolio}
                  updateTradeAction={this.updateTradeAction}
                  showDetails={false}
                />
              }
            />
            <Route exact path="/stock-details"
              render={() =>
                <Searchbar
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handlePredictionClick={this.fetchSelectedStock}
                  userPortfolio={this.state.user.userPortfolio}
                  updateTradeAction={this.updateTradeAction}
                  showDetails={true}
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
                  exitButton={this.exitButton}
                />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/friend"
              render={() =>
                <Friend handleFriendClick={this.selectedUserSearch}
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
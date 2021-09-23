/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Portfolio from './Portfolio/Portfolio.jsx';
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
        username: 'bezos_the_first',
        email: '',
        cashBalance: 200000,
        rank: 1,
        userPortfolio: [
          {
            amount: 1000000,
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
        username: '',
        rank: 0,
        portfolioValue: 0,
        selectedFriendPortfolio: [
        //  {
        //     name:
        //     symbol
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
    // this is temp
    const portfolioValue= Math.floor(Math.random() * 10000000);
    // this is temp
    const rank = Math.ceil(Math.random() * 100);
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
            const selectedFriend = {
              username,
              rank,
              portfolioValue,
              selectedFriendPortfolio
            };
            this.setState({
              selectedFriend
            });
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
          </div>*/}

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
            <Route exact path="/portfolio"
              render={() =>
                <Portfolio user={this.state.user} onStockClick={this.fetchSelectedStock}/>
              }/>
            <Route exact path="/stock-search"
              render={() =>
                <Searchbar
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handlePredictionClick={this.fetchSelectedStock}
                  userPortfolio={this.state.user.userPortfolio}
                  updateTradeAction={this.updateTradeAction}
                />
              }
            />
            <Route exact path="/trade"
              render={() =>
                <Trade
                  tradeAction={this.state.trade.action}
                  stockSelected={this.state.stockSelected}
                  user={this.state.user}
                  handleTrade={this.handleTrade}
                  action={this.state.trade.action}
                />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/friend" component={Friend} />
          </Switch>
          <Navbar />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
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
// import StockDetailPage from './StockDetailPage.jsx';
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
        cashBalance: 10,
        portfolioValue: 0,
        rank: 0,
        userPortfolio: [],
        friends: []
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
    this.updateTradeAction = this.updateTradeAction.bind(this);
    this.selectedUserSearch = this.selectedUserSearch.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser(this.state.user.username);
  }

  updateTradeAction(action) {
    this.setState({
      trade: { action }
    });
  }

  selectedUserSearch(user) {
    console.log('searching for user', user);
    let portfolio = [];
    axios.get('/api/getPortfolio?username='+user)
      .then((results) => {
        portfolio = results.data;
        axios.get('/api/getUser?username='+user)
          .then((result) => {
            const { id, first_name, last_name, username, email, cash_position, portfolio_value } = result.data;
            this.setState({
              selectedFriend: {
                id: id,
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                cashBalance: cash_position,
                portfolioValue: portfolio_value,
                userPortfolio: portfolio,
              }
            }, () => {
              console.log('the state was set');
              console.log(this.state.selectedFriend);
              this.forceUpdate();
            });
          });
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
              });
          });
      })
      .catch((e) => e);
  }

  fetchSelectedStock(symbol) {
    console.log('new stock selected!', symbol);
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
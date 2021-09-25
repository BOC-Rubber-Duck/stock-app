import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioValue from './helpers/getPortfolioValue.js';
import axios from 'axios';


//TODO: Move helper function to App level, refactor to be classless and render only based on props

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userPortfolio: [],
        username: 'portfolioDefault',
        rank: null,
        cashBalance: 1000000,
      }
    };
  }

  componentDidMount() {
    if (this.props.self) {
      var userCopy = this.props.user;
      getPortfolioValue(userCopy).then((expandedUser) => {
        this.setState({
          'user': expandedUser
        });
      }).catch((err) => {
        return err;
      });
    }
  }

  componentDidUpdate() {
    var user = this.props.user;
    if (!this.props.self && this.state.user.username !== user.username) {
      axios.get('/api/getUser?username='+user.username)
        .then((res) => {
          user.cashBalance = res.data.cash_position;``
          this.setState({
            'user': user
          });
        });
    }

    if (this.props.self && this.state.user.username !== user.username) {
      getPortfolioValue(user).then((expandedUser) => {
        this.setState({
          'user': expandedUser
        });
      }).catch((err) => {
        return err;
      });
    }
  }

  render() {
    const stocks = this.state.user.userPortfolio || this.state.user.selectedFriendPortfolio;
    const self = this.props.self;
    const handleStockClick = this.props.handleStockClick;

    const stockbars = stocks.map((stockObject) => {
      if (stockObject) {
        return (
          <Link to="/stock-search" key={stockObject.ticker_symbol || stockObject.symbol}>
            <Stockbar stock={stockObject} showValue={self} handleStockClick={handleStockClick}/>
          </Link>
        );
      } else {
        return (<div></div>);
      }
    });

    return (
      <div className="portfolio-container">
        <Usercard user={this.state.user} self={this.props.self}/>
        <div>{stockbars}</div>
      </div>
    );
  }
}


export default Portfolio;
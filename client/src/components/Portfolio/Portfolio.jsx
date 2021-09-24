import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioValue from './helpers/getPortfolioValue.js';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userPortfolio: [],
        username: '',
        rank: null,
        cashBalance: 1000000,
      }
    };
  }

  componentDidMount() {
    if (this.props.user.userPortfolio.length > 0) {
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

  render() {
    console.log(this.state.user);
    const stocks = this.state.user.userPortfolio;

    const stockbars = stocks.map((stockObject) => {
      return (
        <Link to="/stock-search" key={stockObject.ticker_symbol}>
          <Stockbar stock={stockObject} showValue={true} handleStockClick={this.props.handleStockClick}/>
        </Link>
      );
    });

    return (
      <div>
        <Usercard user={this.state.user}/>
        <div>{stockbars}</div>
      </div>
    );
  }
}


export default Portfolio;
import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioValue from './helpers/getPortfolioValue.js';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {
    var userCopy = this.props.user;
    getPortfolioValue(userCopy).then((expandedUser) => {
      this.setState({
        'user': expandedUser
      });
    }).catch((err) => {
      return err;
    });
  }

  render() {
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
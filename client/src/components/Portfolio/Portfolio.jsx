import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioValue from './helpers/getPortfolioValue.js';


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
    console.log('componentMounted');
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
    console.log('componentUpdated');
    if (!this.props.self && this.state.user.username === 'portfolioDefault') {
      this.setState({
        'user': this.props.user
      });
    }
  }

  render() {
    console.log('rendering a portfolio for the following user:', this.state.user.username);
    console.log('props contained the following user:', this.props.user.username);
    const stocks = this.state.user.userPortfolio;
    const self = this.props.self;
    const handleStockClick = this.props.handleStockClick;

    const stockbars = stocks.map((stockObject) => {
      return (
        <Link to="/stock-search" key={stockObject.ticker_symbol}>
          <Stockbar stock={stockObject} showValue={self} handleStockClick={handleStockClick}/>
        </Link>
      );
    });

    return (
      <div>
        <Usercard user={this.state.user} self={this.props.self}/>
        <div>{stockbars}</div>
      </div>
    );
  }
}


export default Portfolio;
import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioValue from './helpers/getPortfolioValue.js';
import axios from 'axios';

const Portfolio = (props) => {
  const stocks = props.user.userPortfolio || props.user.selectedFriendPortfolio;
  const self = props.self;
  const handleStockClick = props.handleStockClick;

  const stockbars = stocks.map((stockObject) => {
    if (stockObject) {
      return (
        <Link to="/stock-details" key={stockObject.ticker_symbol || stockObject.symbol}>
          <Stockbar stock={stockObject} showValue={self} handleStockClick={handleStockClick}/>
        </Link>
      );
    } else {
      return (<div></div>);
    }
  });

  return (
    <div className="portfolio-container">
      <Usercard user={props.user} self={props.self}/>
      <div>{stockbars}</div>
    </div>
  );
};


export default Portfolio;
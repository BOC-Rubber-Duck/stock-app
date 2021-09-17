import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';
import getPortfolioData from './helpers/getPortfolioData.js';

const Portfolio = (props) => {
  var expandedUser = getPortfolioData(props.user);
  console.log(expandedUser);
  const stocks = expandedUser.userPortfolio;

  const stockbars = stocks.map((stockObject) => {
    return (
      <Link to="/stock-detail-page">
        <Stockbar stock={stockObject} useCase='portfolio' onClick={props.onStockClick}/>
      </Link>
    );
  });

  return (
    <div>
      <Usercard user={props.user}/>
      <div>{stockbars}</div>
    </div>
  );
};


export default Portfolio;
import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';
import {Link} from 'react-router-dom';

const Portfolio = (props) => {
  const stocks = props.user.userPortfolio;
  const stockbars = stocks.map((stockObject) => {
    return(
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
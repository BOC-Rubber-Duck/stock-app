import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';

const Portfolio = (props) => {
  const stocks = props.user.userPortfolio;
  const stockbars = stocks.map((stockObject) => {
    return(<Stockbar stock={stockObject} useCase='portfolio'/>);
  });
  console.log(stockbars);

  return (
    <div>
      <Usercard user={props.user}/>
      <div>{stockbars}</div>
    </div>
  );
};


export default Portfolio;
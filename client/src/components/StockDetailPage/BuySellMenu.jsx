/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';

const BuySellMenu = (props) => {
  // check if cash balance is enough to buy at least one stock
  const displayBuy = props.cash >= props.price ? true : false;
  // check if stock is in portfolio
  const length = props.stockPortfolio.length;
  let numStock = null;
  for (let i = 0; i < length; i++) {
    const stock = props.stockPortfolio[i];
    console.log(stock);
    if (stock.stockName === props.name) {
      numStock = stock.sharesOwned;
    }
  }
  numStock = numStock || 0;
  const displaySell = numStock > 0 ? true : false;
  const handleClick = (event) => {
    const action = event.target.value;
    props.updateTradeAction(action);
  };
  return (
    <div className='BuySellMenu'>
      {displayBuy ?
        <Link to='/trade'>
          <button
            className='buyButton'
            onClick={handleClick}
            value='buy'
          >
              Buy
          </button> :
        </Link> :
        null
      }
      {displaySell ?
        <Link to='/trade'>
          <button
            className='sellButton'
            onClick={handleClick}
            value='sell'
          >
                Sell
          </button>
        </Link> :
        null
      }
    </div>
  );
};

export default BuySellMenu;
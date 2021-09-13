/* eslint-disable react/prop-types */
import React from 'react';
import {useHistory} from 'react-router-dom';

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
  const history = useHistory();
  const handleClick = () => {
    history.push('/trade');
  };
  return (
    <div className='BuySellMenu'>
      {displayBuy ?
        <button
          className='buyButton'
          onClick={handleClick}
        >
            Buy
        </button> :
        null}
      {displaySell ?
        <button
          className='sellButton'
          onClick={handleClick}
        >
            Sell
        </button> :
        null}
    </div>

  );
};

export default BuySellMenu;
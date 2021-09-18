/* eslint-disable react/prop-types */
import React from 'react';
import {useHistory} from 'react-router-dom';

const BuySellMenu = (props) => {
  // check if cash balance is enough to buy at least one stock
  const displayBuy = props.user.cashBalance >= props.stockSelected.price ? true : false;
  // check if stock is in portfolio
  const length = props.user.userPortfolio.length;
  let numStock = null;
  for (let i = 0; i < length; i++) {
    const stock = props.user.userPortfolio[i];
    console.log(stock);
    if (stock.stockName === props.stockSelected.name) {
      numStock = stock.sharesOwned;
    }
  }
  numStock = numStock || 0;
  const displaySell = numStock > 0 ? true : false;
  let action = null;
  const history = useHistory();
  const handleClick = (event) => {
    action = event.target.value;
    props.updateTradeAction(action);
    history.push('/trade');
  };
  return (
    <div className='BuySellMenu'>
      {displayBuy ?
        <button
          className='buyButton'
          onClick={handleClick}
          value='buy'
        >
          Buy
        </button> :
        null
      }
      {displaySell ?
        <button
          className='sellButton'
          onClick={handleClick}
          value='sell'
        >
          Sell
        </button> :
        null
      }
    </div>
  );
};

export default BuySellMenu;
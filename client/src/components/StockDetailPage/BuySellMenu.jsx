/* eslint-disable react/prop-types */
import React from 'react';
import {useHistory} from 'react-router-dom';

const BuySellMenu = (props) => {
  // check if cash balance is enough to buy at least one stock
  const displayBuy = props.cash >= props.price ? true : false;
  // check if stock is in portfolio
  const displaySell = props.numStock > 0 ? true : false;
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
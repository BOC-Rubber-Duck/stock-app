import React from 'react';

/*
Will likely need to be refactored based on routes.
May potentially be refactored to take in username and make request within the component.

Current expected props w/ example:

  user: {
    username: 'RubberDuck',
    rank: 2,
    cashbalance: 500000,
    stockbalance: 500000,
  }
*/

const Usercard = (props) => {
  let stockbalance = 0;
  const stocks = props.user.userPortfolio;
  stocks.forEach((stock) => {
    stockbalance += stock.valueOwned;
  });

  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span>{props.user.username}</span>
        <span></span>
        <span>Rank: {props.user.rank}</span>
      </div>
      <div className='profdetail1'>
        <span>
          <p>Cash Balance</p>
          <p>${props.user.cashBalance}</p>
        </span>
        <span></span>
        <span>
          <p>Stonk Value</p>
          <p>${stockbalance}</p>
        </span>
      </div>
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span>
          <p>Total</p>
          <p>${props.user.cashBalance + stockbalance}</p>
        </span>
        <span><p className='diamond'>💎</p></span>
        <span></span>
      </div>
    </div>
  );
};

export default Usercard;
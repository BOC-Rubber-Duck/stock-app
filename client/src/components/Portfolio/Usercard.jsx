import React from 'react';

/*
Will likely need to be refactored based on routes.
May potentially be refactored to take in username and make request within the component.

Current expected props w/ example:

amount: 1000000
exchange: "nasdaq"
id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23"
ticker_symbol: "fb"
user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13"
*/

const Usercard = (props) => {
  // let stockbalance = 0;
  // const stocks = props.user.userPortfolio;
  // stocks.forEach((stock) => {
  //   //will need to eventually be amount X current price
  //   stockbalance += stock.amount;
  // });

  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span>{props.user.username}</span>
        <span></span>
        <span>Rank: {/* props.user.rank*/}</span>
      </div>
      <div className='profdetail1'>
        <span>
          <p>Cash Balance</p>
          <p>${props.user.cashBalance}</p>
        </span>
        <span></span>
        <span>
          <p>Stonk Value</p>
          <p>${props.user.portfolioValue}</p>
        </span>
      </div>
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span>
          <p>Total</p>
          <p>${parseInt(props.user.cashBalance) + parseInt(props.user.portfolioValue)}</p>
        </span>
        <span><p className='diamond'>💎</p></span>
        <span></span>
      </div>
    </div>
  );
};

export default Usercard;
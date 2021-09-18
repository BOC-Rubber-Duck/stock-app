import React from 'react';

/*
Still need to pull in Rank
*/

const Usercard = (props) => {
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
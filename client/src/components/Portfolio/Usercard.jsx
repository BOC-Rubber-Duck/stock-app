import React from 'react';

/*
Still need to pull in Rank
*/

const Usercard = (props) => {
  const totalValue = props.user.cashBalance + props.user.portfolioValue;
  const percentChange = ((totalValue - 1000000)/10000).toFixed(2);
  var gainLoss;
  if (percentChange < 0) {
    gainLoss = 'Loss';
  } else {
    gainLoss = 'Gain';
  }
  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span className='prof-name'>{props.user.username}</span>
        <span></span>
        <span className='prof-rank-container'>
          <p className='prof-title'>Rank</p>
          <p className='prof-rank-val'>{props.user.rank}</p>
        </span>
      </div>
      <div className='profdetail1'>
        <span className='prof-cash-container'>
          <p className='prof-title'>Cash Balance</p>
          <p className='prof-cash-val'>{props.user.cashBalance}</p>
        </span>
        <span></span>
        <span className='prof-stonk-container'>
          <p className='prof-title'>Stonk Value</p>
          <p className='prof-stonk-val'>{props.user.portfolioValue}</p>
        </span>
      </div>
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span className='prof-net-container'>
          <p>Net {gainLoss}</p>
          <p>{percentChange}%</p>
        </span>
        <span><p className='diamond'>💎</p></span>
        <span></span>
      </div>
    </div>
  );
};

export default Usercard;
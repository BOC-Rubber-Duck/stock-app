import React from 'react';

/*
Still need to pull in Rank
*/

const Usercard = (props) => {
  const totalValue = props.user !== undefined ? (Number(props.user.cashBalance)/100 + Number(props.user.portfolioValue)).toFixed(2) : 0;

  const percentChange = ((totalValue - 1000000)/10000);
  var gainLoss;
  if (percentChange < 0) {
    gainLoss = 'Loss';
  } else {
    gainLoss = 'Gain';
  }

  var personalDetails;

  if (props.self === true) {
    personalDetails =
      <div className='profdetail1'>
        <span className='prof-cash-container'>
          <p className='prof-title'>Cash Balance</p>
          <p className='prof-cash-val'>${props.user.cashBalance/100}</p>
        </span>
        <span></span>
        <span className='prof-stonk-container'>
          <p className='prof-title'>Stonk Value</p>
          <p className='prof-stonk-val'>${props.user.portfolioValue}</p>
        </span>
      </div>;
  } else {
    personalDetails = (<div></div>);
  };

  var rankSpan;
  if (props.user.rank) {
    rankSpan = <span>
      <p className='prof-title'>Rank</p>
      <p className='prof-rank-val'>{props.user.rank}</p>
      </span>;
  } else {
    rankSpan = <span></span>;
  }

  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span className='usercard-username'>{props.user.username}</span>
        {rankSpan}
      </div>
      {personalDetails}
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span className='prof-net-container'>
          <p>Net {gainLoss}</p>
          <p>{percentChange.toFixed(2)}%</p>
        </span>
        <span><p className='diamond'>💎</p></span>
        <span></span>
      </div>
    </div>
  );
};

export default Usercard;
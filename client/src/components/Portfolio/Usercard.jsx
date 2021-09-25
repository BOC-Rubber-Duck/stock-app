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
        <span>
          <p>Cash Balance</p>
          <p>${props.user.cashBalance/100}</p>
        </span>
        <span></span>
        <span>
          <p>Stonk Value</p>
          <p>${props.user.portfolioValue}</p>
        </span>
      </div>;
  } else {
    personalDetails = (<div></div>);
  };

  var rankSpan;
  if (props.user.rank) {
    rankSpan = <span>Rank: {props.user.rank}</span>;
  } else {
    rankSpan = <span></span>;
  }

  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span>{props.user.username}</span>
        <span></span>
        {rankSpan}
      </div>
      {personalDetails}
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span>
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
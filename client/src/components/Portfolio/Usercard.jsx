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

  var personalDetails;

  if (props.self === true) {
    personalDetails =
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
      </div>;
  } else {
    personalDetails = (<div></div>);
  };


  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span>{props.user.username}</span>
        <span></span>
        <span>Rank: {/* props.user.rank*/}</span>
      </div>
      {personalDetails}
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span>
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
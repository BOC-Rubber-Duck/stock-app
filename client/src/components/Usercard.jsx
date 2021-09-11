import React from 'react';

// Expected props w/ examples:
// username: 'RubberDuck'
// rank: 2
// cashbalance: 500000
// stockbalance: 500000


const Usercard = (props) => {
  return (
    <div className='usercard'>
      <div className='profdetail1'>
        <span>Rubber Duck</span>
        <span></span>
        <span>Rank: 2</span>
      </div>
      <div className='profdetail1'>
        <span>
          <p>Cash Balance</p>
          <p>$500000</p>
        </span>
        <span></span>
        <span>
          <p>Stonk Value</p>
          <p>$500000</p>
        </span>
      </div>
      <div className='profdetail2'>
        <span></span>
        <span><p className='diamond'>💎</p></span>
        <span>
          <p>Total</p>
          <p>$1000000</p>
        </span>
        <span><p className='diamond'>💎</p></span>
        <span></span>
      </div>
    </div>
  );
};

export default Usercard;
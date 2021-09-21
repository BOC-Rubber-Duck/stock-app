import React from 'react';

// Expected props w/ examples:
// symbol: 'TSLA'
// name: 'Tesla, Inc.'
// value (optional, in dollars and cents): 134.50
// useCase: ['stockSearch', portfolio]

const Stockbar = (props) => {
  let col3 = '';
  if (props.type === 'portfolio') {
    col3 = <div className='barColumn'><p>${props.value}</p></div>;
  } else if (props.type === 'stockSearch') {
    col3 = <div className='barColumn'></div>;
  }

  return (
    <div className='bar' key={props.symbol}>
      <div className='barColumn'>
        <span>{props.symbol}</span>
        <span>{props.name}</span>
      </div>
      <div className='barColumn'></div>
      {col3}
    </div>
  );
};

export default Stockbar;
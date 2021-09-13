import React from 'react';

/* Expected props w/ examples:
  stock: {
    stockSymbol: 'TSLA'
    stockName: 'Tesla, Inc.'
    valueOwned (optional): 13400
  }
  useCase: ['stockSearch', 'portfolio']
*/

const Stockbar = (props) => {
  let col3 = '';
  if (props.useCase === 'portfolio') {
    col3 = <div className='barColumn'><p>${props.stock.valueOwned}</p></div>;
  } else if (props.useCase === 'stockSearch') {
    col3 = <div className='barColumn'></div>;
  }

  return (
    <div className='bar' key={props.stock.stockSymbol}>
      <div className='barColumn'>
        <p>{props.stock.stockSymbol}</p>
        <p>{props.stock.stockName}</p>
      </div>
      <div className='barColumn'></div>
      {col3}
    </div>
  );
};

export default Stockbar;
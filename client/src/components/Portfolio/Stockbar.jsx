import React from 'react';

/* Expected props w/ examples:
  stock: {
    amount: 1000000,
    exchange: "nasdaq",
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
    ticker_symbol: "fb",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13"
  }
  useCase: ['stockSearch', 'portfolio']
  onClick: should be 'fetchSelectedStock' from top level state
*/

const Stockbar = (props) => {
  let col3 = '';
  if (props.useCase === 'portfolio') {
    col3 = <div className='barColumn'><p>${props.stock.valueOwned}</p></div>;
  } else if (props.useCase === 'stockSearch') {
    col3 = <div className='barColumn'></div>;
  }

  return (
    <div className='bar' key={props.stock.ticker_symbol} onClick={() => {
      props.onClick(props.stock.ticker_symbol);
    }}>
      <div className='barColumn'>
        <p>{props.stock.ticker_symbol}</p>
        <p>{props.stock.stockName}</p>
      </div>
      <div className='barColumn'></div>
      {col3}
    </div>
  );
};

export default Stockbar;
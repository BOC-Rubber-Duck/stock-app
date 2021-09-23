import React from 'react';

/* Expected props w/ examples:
  stock: {
    amount: 1000000,
    exchange: "nasdaq",
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23",
    ticker_symbol: "fb",
    name: "facebook",
    user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13"
  }
  showValue: [true, false]
  onClick: should be 'fetchSelectedStock' from top level state
*/

const Stockbar = (props) => {
  console.log(props.stock);
  let col3 = '';
  if (props.showValue === true) {
    col3 = <div className='barColumn'><p>${props.stock.valueOwned}</p></div>;
  } else if (props.useCase === 'stockSearch') {
    col3 = <div className='barColumn'></div>;
  }

  return (
    <div className='bar' key={props.stock.ticker_symbol} /*onClick={() => {
      props.onClick(props.stock.ticker_symbol);
    }}*/>
      <div className='barColumn'>
        <p>{props.stock.ticker_symbol || props.stock.symbol}</p>
        <p>{props.stock.stockName || props.stock.name}</p>
      </div>
      <div className='barColumn'></div>
      {col3}
    </div>
  );
};

export default Stockbar;
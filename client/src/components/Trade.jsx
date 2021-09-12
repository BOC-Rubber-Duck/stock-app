import React from 'react';

import Searchbar from './Searchbar.jsx'

const Trade = (props) => {
  return (
    <div className="trade-container" id="trade-container">
      <Searchbar />
      Buy/Sell Stocks!
    </div>
  );
};

export default Trade;
import React from 'react';
import Searchbar from './Searchbar.jsx';

const StockSearch = (props) => {
  return (
    <div className="stock-search-container" id="stock-search-container">
      Search for Stocks!
      <Searchbar />
    </div>
  );
};

export default StockSearch;
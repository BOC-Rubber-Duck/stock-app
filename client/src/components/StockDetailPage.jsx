/* eslint-disable react/prop-types */
import React from 'react';
import StockInformation from './StockDetailPage/StockInformation.jsx';
import BuySellMenu from './StockDetailPage/BuySellMenu.jsx';
import StockTrends from './StockDetailPage/StockTrends.jsx';

const StockDetailPage = (props) => {
  return (
    <div className='StockDetailPage'>
      <StockInformation
        name={props.stockSelected.name}
        symbol={props.stockSelected.symbol}
        price={props.stockSelected.price}
      />
      <StockTrends
        trendData={props.stockSelected.data}
      />
      <BuySellMenu
        name={props.stockSelected.name}
        price={props.stockSelected.price}
        cash={props.user.cashBalance}
        stockPortfolio={props.user.userPortfolio}
      />
    </div>
  );
};


export default StockDetailPage;
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
        stockSelected={props.stockSelected}
        user={props.user}
        updateTradeAction={props.updateTradeAction}
        handleTrade={props.handleTrade}
      />
    </div>
  );
};

export default StockDetailPage;
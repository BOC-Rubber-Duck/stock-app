/* eslint-disable react/prop-types */
import React from 'react';

const StockInformation = (props) => {
  if (props.price) {
    return (
      <div className='StockInformation'>
        <span className='StockInformation-Name'>{props.name}</span>
        <span className='StockInformation-Symbol'>{props.symbol}</span>
        <div className='StockInformation-Price'>${props.price.toFixed(2)}</div>
      </div>
    );
  }
  return null;
};

export default StockInformation;
/* eslint-disable react/prop-types */
import React from 'react';
import Graph from './Graph.jsx';
import {formatAPIData} from './helpers/formatAPIData.js';

const StockTrends = (props) => {
  const formattedData = formatAPIData(props.trendData);

  return (
    <div className='StockTrends'>
      <Graph data={formattedData}/>
    </div>
  );
};

export default StockTrends;
import React from 'react';
import StockInformation from './StockInformation.jsx';
import BuySellMenu from './BuySellMenu.jsx';
import StockTrends from './StockTrends.jsx';
import { sampleData } from '/Users/alizehrehman/Documents/RPP28/stock-app/sampleData/sampleData.js';

class StockDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Tesla Inc.', // should come from app as props
      symbol: 'TSLA', // should come from app as props
      price: 733.57, // need to figure out where this comes from
      cash: 1000000, // app level or pull from db?
      numStock: 0, // app level or pull from db?
      trendData: sampleData.data, // pull data for longest duration
    };
  }

  initialize() {
    // TODO pull trendData from API and set state
  }

  render() {
    return (
      <div className='StockDetailPage'>
        <StockInformation
          name={this.state.name}
          symbol={this.state.symbol}
          price={this.state.price}
        />
        <StockTrends
          graphView={this.state.graphView}
          trendData={this.state.trendData}
        />
        <BuySellMenu
          price={this.state.price}
          cash={this.state.cash}
          numStock={this.state.numStock}
        />
      </div>
    );
  }
}

export default StockDetailPage;
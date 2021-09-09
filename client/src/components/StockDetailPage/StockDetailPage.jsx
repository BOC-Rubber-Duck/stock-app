import React from 'react';
import StockInformation from './StockInformation.jsx';
import BuySellMenu from './BuySellMenu.jsx';
import StockTrends from './StockTrends.jsx';

class StockDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // should come from app as props
      symbol: '', // should come from app as props
      price: 0, // need to figure out where this comes from
      cash: 0, // app level or pull from db?
      numStock: 0, // app level or pull from db?
      trendData: [], // pull data for longest duration
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
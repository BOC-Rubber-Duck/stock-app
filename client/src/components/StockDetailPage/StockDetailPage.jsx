import React from 'react';
import StockInformation from './StockInformation.jsx';
import BuySellMenu from './BuySellMenu.jsx';
import StockTrends from './StockTrends.jsx';

class StockDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // should come from app as props TODO: refactor to not include in state
      symbol: '', // should come from app as props TODO: refactor to not include in state
      price: 0, // need to figure out if this will be stored at the app level or will need to pull transactions from db
      cash: 0, // app level or pull from db?
      numStock: 0, // app level or pull from db?
      oneDayData: [],
      oneWeekData: [],
      oneMonthData: [],
      graphView: 'oneDay',
    };

    this.toggleGraphView = this.toggleGraphView.bind(this);
  }

  initialize() {
    // TODO pull trendData from API and set state
  }
    
  toggleGraphView(view) {
    this.setState({
      graphView: view
    })
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
          oneDayData={this.state.oneDayData}
          oneWeekData={this.state.oneWeekData}
          oneMonthData={this.state.oneMonthData}
        />
        <BuySellMenu 
          price={this.state.price}
          cash={this.state.cash}
          numStock={this.state.numStock}
        />
      </div>
    )
  }
}

export default StockDetailPage;
import React from 'react';

class BuySellMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBuy: false,
      displaySell: false,
    };
  }

  initialize() {
    // check if cash balance is enough to buy at least one stock
    const displayBuy = this.props.cash >= this.props.price ? true : false;
    // check if stock is in portfolio
    const displaySell = this.props.numStock > 0 ? true : false;
    this.setState({displayBuy, displaySell});
  }

  handleBuy() {
    // TODO: direct to buy page
  }

  handleSell() {
    // TODO: direct to sell page
  }
  render() {
    return (
      <div className='BuySellMenu'>
        <BuyButton displayBuyButton={this.state.displayBuyButton}/>
        <SellButton diplaySellButton={this.state.displaySellButton}/>
      </div>
    );
  }
}

export default BuySellMenu;
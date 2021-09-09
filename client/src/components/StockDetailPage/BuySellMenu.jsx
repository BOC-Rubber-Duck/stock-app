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
    console.log('Clicked Buy!'); // placeholder
    // TODO: direct to buy page
  }

  handleSell() {
    console.log('Clicked Sell!'); // placeholder
    // TODO: direct to sell page
  }
  render() {
    return (
      <div className='BuySellMenu'>
        {this.state.displayBuy ?
          <button
            className='buyButton'
            onClick={this.handleBuy}>
              Buy
          </button> :
          null}
        {this.state.displaySell ?
          <button
            className='sellButton'
            onClick={this.handleSell}>
              Sell
          </button> :
          null}
      </div>
    );
  }
}
// BuySellMenu.propTypes = {
//   cash: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   numStock: PropTypes.number.isRequired
// };
export default BuySellMenu;
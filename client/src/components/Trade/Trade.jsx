import React from 'react';
import TradeMessage from './TradeMessage.jsx';
import {tradeValidation} from './helperFunctions/tradeValidation.js';
import ExitButton from './ExitButton.jsx';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      tradeIsValid: true,
      message: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   console.log('trade component mounted', this.props, this.state);
  //   if (this.props.tradeAction === 'sell') {
  //     this.setState({
  //       action: 'sell'
  //     });
  //   }
  // };

  handleInputChange(event) {
    const target = event.target;
    const value = Math.floor(Math.abs(target.value));
    const name = target.name;

    const currentUser = this.props.user;
    const shares = this.state.shares;
    const stockSymbol = this.props.stockSelected.symbol;
    const stockOwned = currentUser !== undefined ? currentUser.userPortfolio.filter(stock => {
      return stock.ticker_symbol === stockSymbol;
    }) : 0;
    const price = this.props.stockSelected.price;
    const cashBalance = (this.props.user.cashBalance/100).toFixed(2);
    const action = this.props.action;

    if (tradeValidation(shares, stockOwned, price, cashBalance, action)) {
      this.setState({
        [name]: value,
        tradeIsValid: true,
        message: 'Trade can be submitted!'
      });
    } else {
      this.setState({
        [name]: value,
        tradeIsValid: false,
        message: 'Trade cannot be submitted'
      });
    }
    this.forceUpdate();
  };

  handleSubmit() {
    const currentUser = this.props.user;
    const stockSymbol = this.props.stockSelected.symbol;
    const action = this.props.action;
    const shares = this.state.shares;
    const price = this.props.stockSelected.price;
    const cashBalance = (this.props.user.cashBalance/100).toFixed(2);
    const stockOwned = currentUser !== undefined ? currentUser.userPortfolio.filter(stock => {
      return stock.ticker_symbol === stockSymbol;
    }) : 0;

    if (tradeValidation(shares, stockOwned, price, cashBalance, action)) {
      let tradeResponse = this.props.handleTrade(currentUser, stockSymbol, shares, action);
      console.log('tradeResponse:', tradeResponse);
    } else {
      console.log('cannot perform trade');
      this.setState({
        message: 'cannot perform trade'
      });
    }
  };

  render() {
    const { user, stockSelected, action } = this.props;
    const stockPrice = stockSelected.price.toFixed(2);

    const saleAmount = (this.state.shares * stockSelected.price).toFixed(2) || 0;
    const actionText = action === 'buy' ? 'Buy': 'Sell';
    const stockOwned = user !== undefined ? user.userPortfolio.filter(stock => {
      return stock.ticker_symbol === stockSelected.symbol;
    }) : 0;
    const sharesOwned = stockOwned.length > 0 ? stockOwned[0].amount : 0;
    const cashAvailable = (user.cashBalance/100).toFixed(2);

    return (
      <section className="trade-container" id="trade-container">
        <div className="trade-header" id="trade-header">
          <span id="trade-header-name">{stockSelected.name}</span>
          <ExitButton />
        </div>
        <div className="trade-action-title" id="trade-action-title">
          <span id="trade-action-title-span">{actionText}</span>
          <span id="trade-action-title-stock">{stockSelected.symbol}</span>
        </div>
        <div className="trade-info" id="trade-info">
          <div className="trade-info-row" id="trade-market-price-container">
            <span className="trade-info-row-left" id="trade-market-price-span-lbl">Market Price</span>
            <span className="trade-info-row-right" id="trade-market-price-span">${stockPrice}</span>
          </div>
          <div className="trade-shares-owned trade-info-row">
            <div className="trade-info-row-left" id="trade-shares-owned-span-lbl">Shares Owned:</div>
            <div className="trade-info-row-right" id="trade-shares-owned-span">{sharesOwned}</div>
          </div>
          <div className="trade-info-row" id="trade-shares">
            <label className="trade-info-row-left" htmlFor="shares">Shares to {action}</label>
            <input
              className="trade-info-row-right"
              id="shares"
              name="shares"
              data-testid="shares"
              type="number"
              style={this.state.tradeIsValid === false ? {color: "red"} : {}}
              value={this.state.shares !== 0 ? this.state.shares : ''}
              onChange={this.handleInputChange} />
          </div>
          <div className="trade-info-row" id="trade-sale-amount-container">
            <span className="trade-info-row-left" id="trade-sale-amt-span-lbl">Sale Amount</span>
            <span className="trade-info-row-right" id="trade-sale-amt-span">${saleAmount}</span>
          </div>
          <div className="trade-info-row" id="trade-cash-container">
            <span className="trade-info-row-left" id="trade-cash-span-lbl">Cash Available</span>
            <span className="trade-info-row-right" id="trade-cash-amt-span">${cashAvailable}</span>
          </div>
        </div>
        <div className="trade-action" id="trade-action">
          <button onClick={this.handleSubmit}>
            {actionText}
          </button>
        </div>
        <TradeMessage message={this.state.message} />
      </section>
    );
  };
};

export default Trade;
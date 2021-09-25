import React from 'react';
import TradeMessage from './TradeMessage.jsx';
import tradeValidation from './helperFunctions/tradeValidation.js';
import ExitButton from './ExitButton.jsx';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      tradeIsValid: true,
      message: 'Example Message Here'
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
    const value = Math.floor(target.value);
    const name = target.name;

    this.setState({
      [name]: value
    });

    const shares = this.state.shares;
    const price = this.props.stockSelected.price;
    const cashBalance = this.props.user.cashBalance;
    const action = this.props.action;

    if (tradeValidation(shares, price, cashBalance, action)) {
      console.log('trade can be performed');
      this.setState({
        tradeIsValid: true,
        message: ''
      });
    } else {
      console.log('trade cannot be performed');
      this.setState({
        tradeIsValid: false,
        message: 'Trade cannot be performed'
      });
    }
  };

  handleSubmit() {
    const currentUser = this.props.user.username;
    const stockSymbol = this.props.stockSelected.symbol;
    const action = this.props.action;
    const shares = this.state.shares;
    const price = this.props.stockSelected.price;
    const cashBalance = this.props.user.cashBalance;

    if (tradeValidation(shares, price, cashBalance, action)) {
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
    return (
      <div className="trade-container" id="trade-container">
        <div className="trade-header" id="trade-header">
          <span id="trade-header-name">{stockSelected.name}</span>
          <ExitButton />
        </div>
        <div className="action-title" id="action-title">
          <span id="action-title-span">{actionText}</span>
          <span id="action-title-stock">{stockSelected.symbol}</span>
        </div>
        <div className="trade-info" id="trade-info">
          <div className="shares-owned">
            <span id="shares-owned-span-lbl">Shares Owned:</span> <span id="shares-owned-span">{sharesOwned}</span>
          </div>
          <div id="shares">
            <label>
            Shares to {action}
              <input
                name="shares"
                data-testid="shares"
                type="number"
                style={{color: "red"}}
                value={this.state.shares !== 0 ? this.state.shares : ''}
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="market-price-container">
            <span id="market-price-span-lbl">Market Price</span> <span id="market-price-span">${stockPrice}</span>
          </div>
          <div id="sale-amount-container">
            <span id="sale-amt-span-lbl">Sale Amount</span>
            <span id="sale-amt-span">${saleAmount}</span>
          </div>
          <div id="cash-container">
            <span id="cash-span-lbl">Cash Available</span>
            <span id="cash-amt-span">${user.cashBalance}</span>
          </div>
          <div className="trade-action" id="trade-action">
            <button onClick={this.handleSubmit}>
              {actionText}
            </button>
          </div>
          <TradeMessage message={this.state.message} />
        </div>
      </div>
    );
  };
};

export default Trade;
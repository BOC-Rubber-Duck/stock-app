import React from 'react';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      message: 'placeholder message'
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
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit() {
    const currentUser = this.props.user.username;
    const stockSymbol = this.props.stockSelected.symbol;
    const action = this.props.action;
    const shares = this.state.shares;

    let tradeResponse = this.props.handleTrade(currentUser, stockSymbol, shares, action);
    console.log('tradeResponse:', tradeResponse);
  };

  render() {
    const { user, stockSelected, action } = this.props;
    const saleAmount = this.state.shares * stockSelected.price || 0;
    const actionText = action === 'buy' ? 'Buy': 'Sell';
    const stockOwned = user.userPortfolio.filter(stock => {
      return stock.ticker_symbol === stockSelected.symbol;
    });
    const sharesOwned = stockOwned.length > 0 ? stockOwned[0].amount : 0;
    return (
      <div className="trade-container" id="trade-container">
        <div className="trade-header" id="trade-header">
          {stockSelected.name}
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
                type="number"
                value={this.state.shares}
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="market-price-container">
            <span id="market-price-span-lbl">Market Price</span> <span id="market-price-span">{stockSelected.price}</span>
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
          <div className="trade-message">
            {this.state.message}
          </div>
        </div>
      </div>
    );
  };
};

export default Trade;
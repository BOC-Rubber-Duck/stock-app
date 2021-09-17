import React from 'react';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      action: 'buy'
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
    const stockSymbol = this.props.stockSelected.symbol;
    const shares = this.state.shares;
    const action = this.state.action;
    let tradeResponse = this.props.handleTrade(stockSymbol, shares, action);
    console.log('tradeResponse:', tradeResponse);
  };

  render() {
    const { user, stockSelected } = this.props;
    const saleAmount = this.state.shares * stockSelected.price || 0;
    const actionText = this.state.action === 'buy' ? 'Buy': 'Sell';

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
          <div id="shares">
            <label>
            Shares to {this.state.action}
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
          <div className="trade-action" id="trade-action">
            <button onClick={this.handleSubmit}>
              {actionText}
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export default Trade;
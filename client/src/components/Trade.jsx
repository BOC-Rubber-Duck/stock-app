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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit() {
    let stockSymbol = this.props.stockSelected.symbol;
    let shares = this.state.shares;
    let action = this.state.action;
    console.log('handleSubmit action confirmed');
    this.props.handleTrade(stockSymbol, shares, action);
  };

  render() {
    const { user, stockSelected } = this.props;
<<<<<<< HEAD
    const saleAmount = this.state.shares * stockSelected || 0;
=======
    const saleAmount = stockSelected !== undefined ? this.state.shares * stockSelected.price: 0;
>>>>>>> 63eb49acbbc385b2e387d11208bb23c20149f9b8
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
                inputmode="numeric"
                pattern="[0-9]*"
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
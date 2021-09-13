import React from 'react';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      action: 'buy'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { user, stockSelected } = this.props;
    return (
      <div className="trade-container" id="trade-container">
        Buy/Sell Stocks!
        <div className="trade-header" id="trade-header">
        </div>
        <div className="action-title" id="action-title">

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
          <div className="trade-action" id="trade-action">

          </div>
        </div>

      </div>
    );
  };
};

export default Trade;
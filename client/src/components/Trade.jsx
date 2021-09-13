import React from 'react';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { user, stockSelected } = props;
    return (
      <div className="trade-container" id="trade-container">
        Buy/Sell Stocks!
        <div className="trade-header" id="trade-header">

        </div>

      </div>
    );
  };
};

export default Trade;
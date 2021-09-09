import React from 'react';

class StockInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='StockInformation'>
        <span className='StockInformation-Name'>{this.props.name}</span>
        <span className='StockInformation-Symbol'>{this.props.symbol}</span>
        <span className='StockInformation-Price'>${this.props.price}</span>
      </div>
    );
  }
}

StockInformation.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  price: Proptypes.string.isRequired
};
export default StockInformation;
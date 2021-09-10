import React from 'react';
import Graph from './Graph.jsx';
import GraphViewMenu from './GraphViewMenu.jsx';
import {formatAPIData} from './helpers/formatAPIData.js';

class StockTrends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphView: '1 Day',
      formattedData: formatAPIData(this.props.trendData)
    };
    this.handleGraphViewChange = this.handleGraphViewChange.bind(this);
  }

  initialize() {
    // formatting data for high charts
    let formattedData = formatAPIData(this.props.trendData);
    this.setState({formattedData});
  }

  handleGraphViewChange(newView) {
    this.setState({
      graphView: newView
    });
  }

  render() {
    return (
      <div className='StockTrends'>
        <Graph data={this.state.formattedData}/>
        {/* <GraphViewMenu
          graphView={this.state.graphView}
          views={this.state.views}
        /> */}
      </div>
    );
  }
}
// StockTrends.propTypes = {
//   trendData: PropTypes.object
// };
export default StockTrends;
import React from 'react';
import Graph from './Graph.jsx';
import GraphViewMenu from './GraphViewMenu.jsx';
import formatAPIData from './helpers/formatAPIData.js';

class StockTrends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphView: '1 Day',
      views: [],
      formattedData: []
    };
    this.handleGraphViewChange = this.handleGraphViewChange.bind(this);
  }

  initialize() {
    const views = [];
    const formattedTrendData = {};
    for (const view in this.props.trendData) {
      if (Object.prototype.hasOwnProperty.call(this.props.trendData, view)) {
        views.push(view);
        // formatting data for high charts
        let data = this.props.trendData;
        let formattedData = formatAPIData(data);
      }
    }
    this.setState({views});
  }

  handleGraphViewChange(newView) {
    this.setState({
      graphView: newView
    });
  }

  render() {
    return (
      <div className='StockTrends'>
        <Graph data={this.props.trendData[this.state.graphView]}/>
        <GraphViewMenu
          graphView={this.state.graphView}
          views={this.state.views}
        />
      </div>
    );
  }
}
// StockTrends.propTypes = {
//   trendData: PropTypes.object
// };
export default StockTrends;
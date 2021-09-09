import React from 'react';
import Graph from './Graph.jsx';
import GraphViewMenu from './GraphView.Menu.jsx';

class StockTrends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphView: '1 Day',
      views: []
    };
    this.handleGraphViewChange = this.handleGraphViewChange.bind(this);
  }

  initialize() {
    const views = [];
    for (const view in this.props.trendData) {
      if (Object.prototype.hasOwnProperty.call(this.props.trendData, view)) {
        views.push(view);
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
        <Graph data={this.props.trendData[graphView]}/>
        <GraphViewMenu
          graphView={this.state.graphView}
          views={this.state.views}
        />
      </div>
    );
  }
}
StockTrends.propTypes = {
  trendData: PropTypes.object
};
export default StockTrends;
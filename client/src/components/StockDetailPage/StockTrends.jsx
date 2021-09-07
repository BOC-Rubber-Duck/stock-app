import React from 'react';

class StockTrends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='StockTrends'>
                <Graph />
                <GraphViewMenu />
            </div>
        )
    }
}

export default StockTrends;
import React from 'react';

class StockDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            symbol: '',
            averagePrice: 0,
            cashBalance: 0,
            numStockInPortfolio: 0,
            oneDayTrendData: [],
            oneWeekTrendData: [],
            oneMonthTrendData: [],
            currentGraphView: 'oneDay',
        };
    }

    render() {
        return (
            <div className='StockDetailPage'>
                <StockInformation />
                <StockTrends />
                <BuySellMenu />
            </div>
        )
    }
}

export default StockDetailPage;
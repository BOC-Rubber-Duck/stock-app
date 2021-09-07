import React from 'react';

class BuySellMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='BuySellMenu'>
                <BuyButton />
                <SellButton />
            </div>
        )
    }
}

export default BuySellMenu;
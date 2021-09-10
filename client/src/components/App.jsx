import React from 'react';
import StockDetailPage from './StockDetailPage/StockDetailPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        id="app-main"
        className="app-main"
        data-testid="app-main"
      >
        <h1>React Header</h1>
        React Component
        <StockDetailPage />
      </div>
    );
  }
}

export default App;
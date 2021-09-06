import React from 'react';

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
      </div>
    );
  }
}

export default App;
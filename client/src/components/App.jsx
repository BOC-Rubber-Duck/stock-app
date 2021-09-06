import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div testId="app-main">
        <h1>React Header</h1>
        React Component
      </div>
    );
  }
}

export default App;
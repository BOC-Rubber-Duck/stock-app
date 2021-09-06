import React from 'react';

import Navbar from './Navbar.jsx'
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
        <Navbar></Navbar>
      </div>
    );
  }
}

export default App;
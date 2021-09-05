import React from 'react';

import Navbar from './Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>React Header</h1>
        React Component
        <Navbar />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import Routes from './Routes';

import './App.css';
import 'semantic-ui-forest-themes/semantic.darkly.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import Routes from './Routes';

import './App.css';
import 'semantic-ui-forest-themes/semantic.darkly.min.css';

const history = createHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;

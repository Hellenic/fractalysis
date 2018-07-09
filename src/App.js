import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          {routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.main}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;

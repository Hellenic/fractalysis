import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './containers/Sidebar/Sidebar';
import routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Sidebar />
          {
            routes.map((route, index) => (
              <Route key={index} exact={route.exact} path={route.path} component={route.main} />
            ))
          }
        </div>
      </Router>
    );
  }
}

export default App;

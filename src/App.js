import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Editor from './containers/Editor/Editor';
import Scenes from './containers/Scenes/Scenes';
import Renders from './containers/Renders/Renders';
import Sidebar from './containers/Sidebar/Sidebar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Sidebar />

          <Route exact path="/" component={Editor}/>
          <Route path="/scenes" component={Scenes}/>
          <Route path="/renders" component={Renders}/>
        </div>
      </Router>
    );
  }
}

export default App;

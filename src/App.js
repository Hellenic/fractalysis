import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FocusStyleManager } from "@blueprintjs/core";
import Editor from './containers/Editor/Editor';
import Scenes from './containers/Scenes/Scenes';
import Renders from './containers/Renders/Renders';
import Sidebar from './containers/Sidebar/Sidebar';

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
  render() {
    return (
      <Router>
        <div className="pt-dark">
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

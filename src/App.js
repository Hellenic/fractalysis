import React, { Component } from 'react';
import { FocusStyleManager } from "@blueprintjs/core";
import Sidebar from './containers/Sidebar/Sidebar';
import Editor from './containers/Editor/Editor';

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
  render() {
    return (
      <div className="pt-dark">
        <Sidebar />
        <Editor />
      </div>
    );
  }
}

export default App;

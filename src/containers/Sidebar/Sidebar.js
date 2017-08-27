import React, { Component } from 'react';
import { Icon } from "@blueprintjs/core";
import logo from './logo.svg';
import './Sidebar.css';

const TextIcon = props => {
  return (
    <div className="icon">
      <Icon iconName={props.iconName} iconSize={Icon.SIZE_LARGE} />
      <div>{props.title}</div>
    </div>
  );
}

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <img src={logo} className="App-logo" alt="logo" />
        <hr />
        <div>
          <TextIcon iconName="folder-open" title="Scenes" />
          <TextIcon iconName="media" title="Renders" />
          <TextIcon iconName="eye-open" title="Editor" />
        </div>
      </aside>
    );
  }
}

export default Sidebar;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Colors, Icon } from "@blueprintjs/core";
import logo from './logo.svg';
import './Sidebar.css';

const TextIcon = props => {
  return (
    <Link to={props.to} className="icon">
      <Icon iconName={props.iconName} iconSize={Icon.SIZE_LARGE} />
      <div>{props.title}</div>
    </Link>
  );
}

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar" style={{ backgroundColor: Colors.DARK_GRAY3 }}>
        <img src={logo} className="App-logo" alt="logo" />
        <hr />
        <div>
          <TextIcon iconName="folder-open" title="Scenes" to="/scenes" />
          <TextIcon iconName="media" title="Renders" to="/renders" />
          <TextIcon iconName="eye-open" title="Editor" to="/" />
        </div>
      </aside>
    );
  }
}

export default Sidebar;

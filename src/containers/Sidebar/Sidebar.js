import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Sidebar.css';

const TextIcon = props => {
  return (
    <Link to={props.to} className="icon">
      <h2>{props.icon}</h2>
      <div>{props.title}</div>
    </Link>
  );
}

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar" style={{ backgroundColor: '#293742' }}>
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <hr />
        <div>
          <TextIcon icon="👀" title="Scenes" to="/scenes" />
          <TextIcon icon="📷" title="Renders" to="/renders" />
          <TextIcon icon="📝" title="Editor" to="/" />
        </div>
        <br />
        <small>Early development version</small><br />
      </aside>
    );
  }
}

export default Sidebar;

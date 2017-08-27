import React, { Component } from 'react';
import FaEye from 'react-icons/lib/fa/eye';
import FaFolderOpen from 'react-icons/lib/fa/folder-open';
import FaCamera from 'react-icons/lib/fa/camera';
import logo from './logo.svg';
import './Sidebar.css';

const Icon = props => {
  const Element = props.icon;
  return (
    <div className="icon">
      <Element size={50} />
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
          <Icon icon={FaFolderOpen} title="Scenes" />
          <Icon icon={FaCamera} title="Renders" />
          <Icon icon={FaEye} title="Editor" />
        </div>
      </aside>
    );
  }
}

export default Sidebar;

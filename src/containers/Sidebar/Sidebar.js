import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PageSelector from './PageSelector';
import routes from '../../routes';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar" style={{ backgroundColor: '#293742' }}>
        {
          routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} render={() => (
              <div>
                <PageSelector index={index} />
                {route.sidebar}
              </div>
            )} />
          ))
        }
        <small>Early development version</small><br />
        <small><a href="https://github.com/Hellenic/fractalysis">Github</a></small>
      </aside>
    );
  }
}

export default Sidebar;

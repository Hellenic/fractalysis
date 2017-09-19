import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import PageSelector from './PageSelector';
import routes from '../../routes';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Menu>
          <Menu.Item name="gamepad">
            <PageSelector />
          </Menu.Item>
          <Menu.Item name="video camera">
            {
              routes.map((route, index) => (
                <Route key={index} exact={route.exact} path={route.path} component={route.navbar} />
              ))
            }
          </Menu.Item>
          <Menu.Item name="video play">
            <Icon name="video play" />
            Randomize
          </Menu.Item>
          <Menu.Item>
            <small>Early development version</small><br />
            <span>
              <Icon name="github" />
              <a href="https://github.com/Hellenic/fractalysis">Github</a>
            </span>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

export default Navbar;

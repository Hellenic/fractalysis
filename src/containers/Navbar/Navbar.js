import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Icon, Menu, List } from 'semantic-ui-react';
import PageSelector from './PageSelector';
import routes from '../../routes';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Menu>
          <Menu.Item>
            <PageSelector />
          </Menu.Item>
          <Menu.Item>
            {
              routes.map((route, index) => (
                <Route key={index} exact={route.exact} path={route.path} component={route.navbar} />
              ))
            }
          </Menu.Item>
          <Menu.Item>
            <List>
              <List.Item>
                <small>Early development version</small><br />
                <small>2017-10-15</small>
              </List.Item>
              <List.Item>
                <span>
                  <Icon name="github" />
                  <a href="https://github.com/Hellenic/fractalysis">Github</a>
                </span>
              </List.Item>
            </List>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

export default Navbar;

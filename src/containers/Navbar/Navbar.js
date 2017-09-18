import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react';
import PageSelector from './PageSelector';
import routes from '../../routes';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Grid columns={8} divided>
          <Grid.Column>
            <PageSelector />
          </Grid.Column>
          <Grid.Column width={12}>
          {
            routes.map((route, index) => (
              <Route key={index} exact={route.exact} path={route.path} component={route.navbar} />
            ))
          }
          </Grid.Column>
          <Grid.Column>
            <small>Early development version</small><br />
            <span>
              <Icon name="github" />
              <a href="https://github.com/Hellenic/fractalysis">Github</a>
            </span>
          </Grid.Column>
        </Grid>
      </nav>
    );
  }
}

export default Navbar;

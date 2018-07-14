import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

class ScenesNavbar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item disabled>
          <Icon name="save" />
          Save
        </Menu.Item>
        <Menu.Item disabled>
          <Icon name="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );
  }
}

export default ScenesNavbar;

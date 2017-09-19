import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import ShaderSelector from './ShaderSelector';

class EditorNavbar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <ShaderSelector />
        </Menu.Item>
        <Menu.Item>
          <Icon name="zoom" />
          Zoom
        </Menu.Item>
        <Menu.Item>
          <Icon name="refresh" />
          Rotate
        </Menu.Item>
        <Menu.Item>
          <Icon name="expand" />
          Scale
        </Menu.Item>
      </Menu>
    );
  }
}

export default EditorNavbar;

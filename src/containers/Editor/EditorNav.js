import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import ComposingShader from '../../components/ComposingShader/ComposingShader';
import RandomizeUniforms from '../../components/RandomizeUniforms/RandomizeUniforms';

class EditorNavbar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <ComposingShader />
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
        <Menu.Item style={{ borderLeft: '1px solid #DDD', borderRadius: 0 }}>
          <RandomizeUniforms />
        </Menu.Item>
      </Menu>
    );
  }
}

export default EditorNavbar;

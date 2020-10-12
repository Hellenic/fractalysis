import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import ShaderComposer from './components/ShaderComposer/ShaderComposer';
import RandomizeUniforms from './components/RandomizeUniforms/RandomizeUniforms';
import DownloadButton from './components/DownloadButton/DownloadButton';
import SaveButton from './components/SaveButton/SaveButton';

class EditorNavbar extends Component {
  render() {
    const dividerStyle = {
      borderLeft: '1px solid #DDD',
      borderRight: '1px solid #DDD',
      borderRadius: 0
    };
    return (
      <Menu secondary>
        <Menu.Item>
          <ShaderComposer />
        </Menu.Item>
        <Menu.Item style={{ maxWidth: '30em' }}>
          <ul>
            <li>
              Use different shaders and randomize to quickly make different
              scenes
            </li>
            <li>Drag the image to move the camera</li>
            <li>Use the settings on the right to fine tune the scene</li>
          </ul>
        </Menu.Item>
        <Menu.Item style={dividerStyle}>
          <RandomizeUniforms />
        </Menu.Item>
        <Menu.Item>
          <SaveButton />
          <DownloadButton />
        </Menu.Item>
      </Menu>
    );
  }
}

export default EditorNavbar;

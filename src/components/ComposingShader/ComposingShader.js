import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import { Dropdown } from 'semantic-ui-react';
import TextIcon from '../../components/TextIcon/TextIcon';
import configurations from './configurations.json';

const DEFAULT_SHADER = 'default2D';

class ComposingShader extends Component {
  state = {
    shader: {}
  }
  async getShader(shaderName) {
    const config = configurations[shaderName];
    // TODO This should be cached. I think we can check it with GL.Shaders, if it's already there
    const shaderResponse = await superagent.get(config.shader);
    const shaderId = GL.Shaders.create({
      [shaderName]: {
        frag: shaderResponse.text
      }
    })[shaderName];
    return {
      shaderId,
      config
    }
  }
  // Load default shader on initial load
  async componentWillMount() {
    this.setState({
      shader: await this.getShader(DEFAULT_SHADER)
    });
  }
  async handleShaderChange(shaderName) {
    this.setState({
      shader: await this.getShader(shaderName)
    });
  }

  render() {
    // TODO Instead of state, use the URL, context or other storage
    // const { shaderId, config } = this.state.shader;

    return (
      <Dropdown trigger={<TextIcon icon="eye" title="Shader" />} icon="dropdown">
        <Dropdown.Menu>
          {
            Object.keys(configurations).map(key => {
              const conf = configurations[key];
              return (
                <Dropdown.Item
                  key={`shader-${key}`}
                  icon={conf.icon}
                  text={conf.name}
                  value={key}
                  onClick={(e, { value }) => this.handleShaderChange(value)}
                />
              );
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default ComposingShader;

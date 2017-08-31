import PropTypes from 'prop-types';
import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import ShaderComposer from '../ShaderComposer/ShaderComposer';
import configurations from './configurations.json';

const DEFAULT_SHADER = 'default2D';

class ComposingShader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
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
    const { shaderId, config } = this.state.shader;
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { shaderId, config }));
    return (
      <div>
        <ShaderComposer configurations={configurations} onChange={s => this.handleShaderChange(s)}/>
        {childrenWithProps}
      </div>
    )
  }
}

export default ComposingShader;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import ShaderComposer from '../ShaderComposer/ShaderComposer';
import fragmentShader2d from '../../shaders/2d-fs.glsl';
import fragmentShader3d from '../../shaders/3d-fs.glsl';

class ComposingShader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  state = {
    shaders: {}
  }
  async componentDidMount() {
    const res2d = await superagent.get(fragmentShader2d);
    const res3d = await superagent.get(fragmentShader3d);
    const shaders = GL.Shaders.create({
      default2d: {
        frag: res2d.text
      },
      default3d: {
        frag: res3d.text
      }
    });
    this.setState({
      currentShader: 'default2d',
      shaders
    });
  }
  handleShaderChange(shaderName) {
    this.setState({
      currentShader: shaderName
    });
  }
  render() {
    const { currentShader, shaders } = this.state;
    const { children } = this.props;
    const shader = {
      name: currentShader,
      id: shaders[currentShader]
    };

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { shader }));
    return (
      <div>
        <ShaderComposer shaders={shaders} onChange={s => this.handleShaderChange(s)}/>
        {childrenWithProps}
      </div>
    )
  }
}

export default ComposingShader;

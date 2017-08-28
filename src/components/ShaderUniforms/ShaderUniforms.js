import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ConfigurationPanel from '../ConfigurationPanel/ConfigurationPanel';
import presets from './presets.json';

const WIDTH = 1920;
const HEIGHT = 966;

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shader: PropTypes.object
  }
  state = {
    uniforms: {}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      uniforms: Object.assign({}, presets[nextProps.shader.name], {
        size: [ WIDTH, HEIGHT ],
        outputSize: [ WIDTH, HEIGHT ]
      })
    });
  }
  onConfigChange(config) {
    this.setState({
      uniforms: Object.assign({}, this.state.uniforms, config)
    });
  }
  render() {
    const { uniforms } = this.state;
    const { children, shader } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      shader: shader.id,
      uniforms
    };
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, childProps));
    return (
      <div>
        <ConfigurationPanel onChange={c => this.onConfigChange(c)} />
        {childrenWithProps}
      </div>
    )
  }
}

export default ShaderUniforms;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ConfigurationPanel from '../ConfigurationPanel/ConfigurationPanel';

const WIDTH = 1920;
const HEIGHT = 966;

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shaderId: PropTypes.number,
    config: PropTypes.object
  }
  state = {
    uniforms: {}
  }
  componentWillReceiveProps(nextProps) {
    const { uniforms } = nextProps.config;
    // Collect the default values from the uniforms configs
    const values = Object.keys(uniforms).reduce((acc, key) => {
      const config = uniforms[key];
      acc[key] = config.defaultValue;
      return acc;
    }, {});

    // Control the uniforms via state, so config can modify them too
    this.setState({
      uniforms: Object.assign({}, values, {
        size: [ WIDTH, HEIGHT ],
        outputSize: [ WIDTH, HEIGHT ]
      })
    });
  }
  onUniformsChange(uniforms) {
    this.setState({
      uniforms: Object.assign({}, this.state.uniforms, uniforms)
    });
  }
  render() {
    const { uniforms } = this.state;
    const { children, config = {}, shaderId } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      shaderId,
      uniforms
    };
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, childProps));
    return (
      <div>
        <ConfigurationPanel uniforms={config.uniforms} onChange={c => this.onUniformsChange(c)} />
        {childrenWithProps}
      </div>
    )
  }
}

export default ShaderUniforms;

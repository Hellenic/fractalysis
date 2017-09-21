import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { parse } from 'qs';
import ConfigurationPanel from '../ConfigurationPanel/ConfigurationPanel';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  state = {
    shaderConfiguration: {},
    uniforms: {}
  }
  componentWillReceiveProps(nextProps) {
    const query = parse(this.props.location.search.substring(1));
    const nextQuery = parse(nextProps.location.search.substring(1));
    // Only handle if the shader has changed or when nothing has been loaded yet
    if (query.shader === nextQuery.shader) {
      return;
    }


    // When shader did change, let's pull the config from sessionStorage
    const shaderConfiguration = JSON.parse(sessionStorage.getItem('shader'));
    const { config: { uniforms } } = shaderConfiguration;

    // Collect the default values from the uniforms configs
    const values = Object.keys(uniforms).reduce((acc, key) => {
      const config = uniforms[key];
      acc[key] = config.defaultValue;
      return acc;
    }, {});

    // Control the uniforms via state, so config can modify them too
    this.setState({
      shaderConfiguration,
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
    const { shaderConfiguration, uniforms } = this.state;
    const { shaderId, config } = shaderConfiguration;
    const { children } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      shaderId,
      uniforms
    };
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, childProps));
    return (
      <div>
        <ConfigurationPanel uniforms={config ? config.uniforms : {}} onChange={c => this.onUniformsChange(c)} />
        {childrenWithProps}
      </div>
    )
  }
}

export default withRouter(ShaderUniforms);

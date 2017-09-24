import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import GL from 'gl-react';
import parse from '../../utils/query-parser';
import configurations from '../configurations.json';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  getUniformValues(shaderName) {
    // Pull default uniform values from the configurations
    const { uniforms } = configurations[shaderName];

    // Collect the default values from the uniforms configs
    return Object.keys(uniforms).reduce((acc, key) => {
      const config = uniforms[key];
      acc[key] = config.defaultValue;
      return acc;
    }, {});
  }

  renderLoading() {
    return (<h1>Loading...</h1>);
  }

  render() {
    const query = parse(this.props.location.search.substring(1));
    const { shader, shaderId,...rest } = query;
    // If shaderID is not present yet, shader might still be compiling
    // or if page was refreshed, ID is there but it anyway might not be compiled yet
    if (!shaderId || !GL.Shaders.exists(shaderId)) {
      return this.renderLoading();
    }

    // Use the values from the URL or pull the defaults from storage
    let uniformValues = Object.assign({}, rest);
    if (Object.keys(uniformValues).length === 0) {
      uniformValues = this.getUniformValues(shader);
    }
    // If there are no uniform values, we're still loading
    if (Object.keys(uniformValues).length === 0) {
      return this.renderLoading();
    }
    // Append some constants to the uniforms
    uniformValues = Object.assign({}, uniformValues, {
      size: [ WIDTH, HEIGHT ],
      outputSize: [ WIDTH, HEIGHT ]
    });

    // Pass the props to children and render
    const { children } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      shaderId: parseInt(shaderId, 10),
      uniforms: uniformValues
    };
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, childProps));
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default withRouter(ShaderUniforms);

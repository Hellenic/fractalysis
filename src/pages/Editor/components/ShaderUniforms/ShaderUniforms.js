import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import parse from '../../../../utils/query-parser';
import { getUniformDefaultValues } from '../../utils/uniforms';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DEFAULT_SHADER = 'Mandelbrot';

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const query = parse(this.props.location.search.substring(1));
    const { shader = DEFAULT_SHADER, download, ...rest } = query;

    // Use the values from the URL or pull the defaults from storage
    let uniformValues = Object.assign({}, rest);
    if (Object.keys(uniformValues).length === 0) {
      uniformValues = getUniformDefaultValues(shader);
    }
    // If there are no uniform values, we're still loading
    if (Object.keys(uniformValues).length === 0) {
      return <h1>Loading...</h1>;
    }
    // Append some constants to the uniforms
    uniformValues = Object.assign({}, uniformValues, {
      size: [WIDTH, HEIGHT],
      outputSize: [WIDTH, HEIGHT]
    });

    // Pass the props to children and render
    const { children } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      uniforms: uniformValues,
      shader
    };
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, childProps)
    );
    return <div>{childrenWithProps}</div>;
  }
}

export default withRouter(ShaderUniforms);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Node } from 'gl-react';
import { Surface } from 'gl-react-dom';

class Fractal extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    uniforms: PropTypes.object,
    shaderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSurfaceRef: PropTypes.func
  };

  render() {
    const { width, height, uniforms, shaderId } = this.props;
    const shaderDef = { id: `${shaderId}`, type: 'ShaderID' };
    return (
      <Surface
        width={width}
        height={height}
        webglContextAttributes={{ preserveDrawingBuffer: true }}
        ref={this.props.onSurfaceRef}
      >
        <Node shader={shaderDef} uniforms={uniforms} />
      </Surface>
    );
  }
}

export default Fractal;

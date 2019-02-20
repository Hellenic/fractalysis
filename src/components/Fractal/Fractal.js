import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Node, Shaders } from 'gl-react';
import { Surface } from 'gl-react-dom';
import superagent from 'superagent';
import Loader from '../Loader/Loader';

class Fractal extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    uniforms: PropTypes.object,
    shader: PropTypes.string,
    onSurfaceRef: PropTypes.func,
    onDraw: PropTypes.func
  };
  static defaultProps = {
    onDraw: () => {}
  };

  state = {
    shaderDef: {}
  };

  async loadShader(shaderKey) {
    // TODO Shaders could be cached (no need to load and create if it's already there)
    const hostname = window.location.hostname;
    const shaderResponse = await superagent.get(
      `http://${hostname}:3001/compile/${shaderKey}`
    );
    const shaders = await Shaders.create({
      [shaderKey]: {
        frag: shaderResponse.text
      }
    });
    const shaderDef = shaders[shaderKey];
    this.setState({ shader: shaderKey, shaderDef });
  }

  async componentDidMount() {
    const { shader } = this.props;
    await this.loadShader(shader);
  }

  async componentDidUpdate() {
    const { shader } = this.props;
    await this.loadShader(shader);
  }

  render() {
    const { width, height, uniforms } = this.props;
    const { shaderDef } = this.state;

    // TODO Would be nice to display different states: Loading, compiling, rendering

    // If shaderID is not present yet, shader might still be compiling
    // or if page was refreshed, ID is there but it anyway might not be compiled yet
    const shaderExists = Shaders.getShortName({ id: shaderDef.id }) !== '???';
    if (!shaderDef || !shaderExists) {
      return <Loader />;
    }

    // If the shader changes, we shouldn't render anything before new shader has been loaded & compiled
    // Otherwise we could end up briefly rendering previous shader with new uniforms
    if (this.props.shader !== this.state.shader) {
      return <Loader />;
    }

    // Append some constants to the uniforms
    const uniformValues = Object.assign({}, uniforms, {
      size: [width, height],
      outputSize: [width, height]
    });

    return (
      <Surface
        width={width}
        height={height}
        webglContextAttributes={{ preserveDrawingBuffer: true }}
        ref={this.props.onSurfaceRef}
      >
        <Node
          shader={shaderDef}
          uniforms={uniformValues}
          onDraw={this.props.onDraw}
        />
      </Surface>
    );
  }
}

export default Fractal;

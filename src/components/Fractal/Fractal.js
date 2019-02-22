import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Node, Shaders } from 'gl-react';
import { Surface } from 'gl-react-dom';
import Loader from '../Loader/Loader';

class Fractal extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    uniforms: PropTypes.object,
    shader: PropTypes.string,
    quality: PropTypes.number,
    onSurfaceRef: PropTypes.func,
    onDraw: PropTypes.func
  };
  static defaultProps = {
    quality: 1,
    onDraw: () => {}
  };

  state = {
    shaderDef: {}
  };

  async loadShader(shaderKey) {
    // TODO Shaders could be cached (no need to load and create if it's already there)
    const hostname = window.location.hostname;
    const response = await fetch(
      `http://${hostname}:3001/compile/${shaderKey}`,
      { cache: 'no-cache' }
    );
    const fragmentShader = await response.text();

    const shaders = await Shaders.create({
      [shaderKey]: {
        frag: fragmentShader
      }
    });
    const shaderDef = shaders[shaderKey];
    this.setState({ shader: shaderKey, shaderDef });
  }

  async componentDidMount() {
    const { shader } = this.props;
    await this.loadShader(shader);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.shader !== prevProps.shader) {
      await this.loadShader(this.props.shader);
    }
  }

  render() {
    const { width, height, uniforms, quality } = this.props;
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
    const qlty = Math.min(Math.max(quality, 1), 5);
    const uniformValues = Object.assign({}, uniforms, {
      size: [width, height],
      outputSize: [width / qlty, height / qlty]
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

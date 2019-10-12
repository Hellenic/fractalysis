import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Node, Shaders, ShadersSheet } from 'gl-react';
import { Surface } from 'gl-react-dom';
import Loader from '../Loader/Loader';

interface IProps {
  width: number;
  height: number;
  uniforms: object;
  shader: string;
  quality: number;
  onSurfaceRef?: () => void;
  onDraw?: () => void;
}

interface IState {
  shader?: string;
  shaders: ShadersSheet;
}

class Fractal extends Component<IProps, IState> {
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
    shader: undefined,
    shaders: {} as ShadersSheet
  };

  async loadShader(shaderKey: string) {
    const { shaders } = this.state;
    // If shader has been loaded already for the given key,
    // set the key as current and do not reload
    if (shaderKey in shaders) {
      this.setState({ shader: shaderKey });
      return;
    }

    // Load the fragment shader, compile it and set it as current
    const response = await fetch(
      `${process.env.PUBLIC_URL}/shaders/${shaderKey}.glsl`,
      {
        cache: 'no-cache'
      }
    );
    const fragmentShader = await response.text();

    const createdShaders = await Shaders.create({
      [shaderKey]: {
        frag: fragmentShader
      }
    });
    const newShaders = Object.assign({}, shaders, createdShaders);
    this.setState({ shader: shaderKey, shaders: newShaders });
  }

  async componentDidMount() {
    const { shader } = this.props;
    await this.loadShader(shader);
  }

  async componentDidUpdate(prevProps: IProps) {
    if (this.props.shader !== prevProps.shader) {
      await this.loadShader(this.props.shader);
    }
  }

  render() {
    const { width, height, uniforms, quality, shader } = this.props;
    const { shaders } = this.state;
    const shaderDef = shaders[shader];

    if (!shaderDef) {
      return <Loader />;
    }

    // TODO Would be nice to display different states: Loading, compiling, rendering

    // If shaderID is not present yet, shader might still be compiling
    // or if page was refreshed, ID is there but it anyway might not be compiled yet
    const shaderExists = Shaders.getShortName(shaderDef) !== '???';
    if (!shaderExists) {
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

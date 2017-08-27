import React, { Component } from 'react';
import GL from 'gl-react';
import { Surface } from "gl-react-dom";
import superagent from 'superagent';
import Fractal from '../../components/Fractal/Fractal';
import fragmentShader from '../../shaders/2d-fs.glsl';
import presets from './presets.json';

const WIDTH = 1920;
const HEIGHT = 966;

class Editor extends Component {
  state = {
    shaders: {}
  }
  async componentDidMount() {
    const res = await superagent.get(fragmentShader);
    const shaders = GL.Shaders.create({
      default: {
        frag: res.text
      }
    });
    this.setState({ shaders });
  }
  render() {
    const { shaders } = this.state;
    const uniforms = Object.assign({}, presets['default'], {
      size: [ WIDTH, HEIGHT ],
      outputSize: [ WIDTH, HEIGHT ]
    });
    if (!shaders.default) {
      return (<h3>Loading...</h3>);
    }
    return (
      <Surface width={WIDTH} height={HEIGHT}>
        <Fractal shader={shaders.default} uniforms={uniforms} />
      </Surface>
    );
  }
}

export default Editor;

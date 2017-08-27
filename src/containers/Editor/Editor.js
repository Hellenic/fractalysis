import React, { Component } from 'react';
import GL from 'gl-react';
import { Surface } from "gl-react-dom";
import superagent from 'superagent';
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel';
import Fractal from '../../components/Fractal/Fractal';
import fragmentShader from '../../shaders/3d-fs.glsl';
import presets from './presets.json';

const WIDTH = 1920;
const HEIGHT = 966;

class Editor extends Component {
  state = {
    shaders: {},
    uniforms: Object.assign({}, presets['default3d'], {
      size: [ WIDTH, HEIGHT ],
      outputSize: [ WIDTH, HEIGHT ]
    })
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
  onConfigChange(config) {
    this.setState({
      uniforms: Object.assign({}, this.state.uniforms, config)
    });
  }
  render() {
    const { shaders, uniforms } = this.state;
    if (!shaders.default) {
      return (<h3>Loading...</h3>);
    }
    return (
      <section>
        <Surface width={WIDTH} height={HEIGHT}>
          <Fractal shader={shaders.default} uniforms={uniforms} />
        </Surface>
        <ConfigurationPanel onChange={c => this.onConfigChange(c)} />
      </section>
    );
  }
}

export default Editor;

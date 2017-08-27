import React, { Component } from 'react';
import { Surface } from "gl-react-dom";
import Fractal from '../../components/Fractal/Fractal';

const WIDTH = 1920;
const HEIGHT = 966;

class Editor extends Component {
  render() {
    return (
      <Surface width={WIDTH} height={HEIGHT}>
        <Fractal blue={0.5} zoom={2.0} />
      </Surface>
    );
  }
}

export default Editor;

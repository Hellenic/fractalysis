import React, { Component } from 'react';
import GL from 'gl-react';
import { Surface } from "gl-react-dom";
import logo from './logo.svg';
import './App.css';

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
      #define NUM_STEPS   50
      #define ZOOM_FACTOR 2.0
      #define X_OFFSET    0.5

      #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
      #else
        precision mediump float;
      #endif
      precision mediump int;
      varying vec2 uv;
      uniform float blue;

      void main() {
        vec2 z;
        float x,y;
        int steps;
        float normalizedX = (gl_FragCoord.x - 320.0) / 640.0 * ZOOM_FACTOR * (640.0 / 480.0) - X_OFFSET;
        float normalizedY = (gl_FragCoord.y - 240.0) / 480.0 * ZOOM_FACTOR;

        z.x = normalizedX;
        z.y = normalizedY;

        for (int i=0;i<NUM_STEPS;i++) {
          steps = i;

          x = (z.x * z.x - z.y * z.y) + normalizedX;
          y = (z.y * z.x + z.x * z.y) + normalizedY;

          if ((x * x + y * y) > 4.0) {
            break;
          }

          z.x = x;
          z.y = y;
        }

        if (steps == NUM_STEPS-1) {
          gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      }
    `
  }
});


const HelloGL = GL.createComponent(({ blue }) =>
  <GL.Node
    shader={shaders.helloGL}
    uniforms={{ blue }}
  />,
  { displayName: "HelloGL" });

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Surface width={1920} height={842}>
          <HelloGL blue={0.3} />
        </Surface>
      </div>
    );
  }
}

export default App;

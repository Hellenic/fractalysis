import React from 'react';
import GL from 'gl-react';
import shaders from './shaders';

const WIDTH = 1920;
const HEIGHT = 966;

const Fractal = GL.createComponent(({ blue, zoom }) =>
  <GL.Node
    shader={shaders.helloGL}
    uniforms={{
      blue,
      zoom,
      resolution: [ WIDTH, HEIGHT ]
    }}
  />
);

export default Fractal;

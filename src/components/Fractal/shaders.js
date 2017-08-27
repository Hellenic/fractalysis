import GL from 'gl-react';

const shaders = GL.Shaders.create({
  helloGL: {
    frag: `
      #define NUM_STEPS   50
      #define X_OFFSET    0.5
      #define Y_OFFSET    0.1

      #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
      #else
        precision mediump float;
      #endif
      precision mediump int;
      varying vec2 uv;
      uniform float zoom;
      uniform vec2 resolution;
      uniform float blue;

      void main() {
        vec2 z;
        float x,y;
        int steps;
        float normalizedX = (gl_FragCoord.x - resolution.x / 2.0) / resolution.x * zoom * (resolution.x / resolution.y) - X_OFFSET;
        float normalizedY = (gl_FragCoord.y - resolution.y / 2.0) / resolution.y * zoom + Y_OFFSET;

        z.x = normalizedX;
        z.y = normalizedY;

        for (int i=0; i<NUM_STEPS; i++) {
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

export default shaders;

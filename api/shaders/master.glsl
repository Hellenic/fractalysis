/**
 * Fractalysis master fragment shader
 *
 * This shader composes multiple other shaders together to create
 * a fragment shader that can render complex fractal flames.
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
   precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

#define NUM_STEPS   50
#define ZOOM_FACTOR 2.0
#define X_OFFSET    0.5

varying vec2 uv;

#pragma glslify: rgb2hsv = require('./colors/rgb2hsv.glsl')
#pragma glslify: hsv2rgb = require('./colors/hsv2rgb.glsl')

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
    gl_FragColor = vec4(uv.x, uv.y, 1.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}

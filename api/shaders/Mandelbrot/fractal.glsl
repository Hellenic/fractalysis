#define maxIterations 50

uniform float power;
uniform int   minIterations;
uniform float bailout;
uniform int bailoutStyle;

uniform bool  juliaMode;
uniform vec2  offset;
uniform float iterationColorBlend;

uniform vec3  color1;
uniform vec3  color2;
uniform vec3  color3;
uniform int   colorMode;
uniform float colorScale;
uniform float colorCycle;
uniform float colorCycleOffset;
uniform bool  colorCycleMirror;
uniform bool  hsv;

// Pre-calculations
float _bailout = exp(bailout);
float log2Bailout = log(2.0 * log(_bailout));
float logPower = log(abs(power));

// Color helpers
#pragma glslify: colorMapping = require('../colors/color-mapping.glsl', bailout=bailout, power=power, color1=color1, color2=color2, color3=color3, colorScale=colorScale, colorMode=colorMode, colorCycle=colorCycle, colorCycleOffset=colorCycleOffset, colorCycleMirror=colorCycleMirror, hsv=hsv, maxIterations=50)
#pragma glslify: bailoutLimit = require('../utils/bailout-limit.glsl', bailout=bailout, bailoutStyle=bailoutStyle);

vec4 Mandelbrot(vec2 z) {
  vec4  color = vec4(color3, 1.0);
  float n = 0.0;
  vec2  c = juliaMode ? offset : z;

  for (int i = 0; i < int(maxIterations); i++) {
      n += 1.0;
      z = complexPower(z, power) + c;

      if (n >= float(minIterations) && bailoutLimit(z)) {
        color = colorMapping(n, z);
        break;
      }
  }

  if (iterationColorBlend > 0.0) {
    float blend = clamp(1.0 - (n / float(maxIterations)) * iterationColorBlend, 0.0, 1.0);
    color.rgb = mix(color3, color.rgb, blend);
  }

  return color;
}

#pragma glslify: export(Mandelbrot);

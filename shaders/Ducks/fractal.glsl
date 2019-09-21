#define maxIterations 50

uniform int   minIterations;
uniform bool  juliaMode;
uniform vec2  offset;

uniform vec3  color1;
uniform vec3  color2;
uniform float colorScale;
uniform float colorCycle;
uniform float colorCycleOffset;
uniform bool  colorCycleMirror;
uniform bool  hsv;

// Color helpers
#pragma glslify: hsv2rgb = require('../colors/hsv2rgb.glsl')
#pragma glslify: rgb2hsv = require('../colors/rgb2hsv.glsl')

vec4 Ducks(vec2 z) {
    vec4  color = vec4(0.0, 0.0, 0.0, 1.0);
    float n = 0.0;
    vec2  c = juliaMode ? offset : z;
    float d = 0.0;
    float v;

    for (int i = 0; i < int(maxIterations); i++) {
        n += 1.0;
        z = complexLog(vec2(z.x, abs(z.y))) + c;

        if (n >= float(minIterations)) {
            d += dot(z, z);
        }
    }

    v = sqrt(d / n);
    v = pow(v, colorScale);
    v *= colorCycle;
    v += colorCycleOffset;

    if (colorCycleMirror) {
        bool even = mod(v, 2.0) < 1.0 ? true : false;
        if (even) {
            v = 1.0 - mod(v, 1.0);
        } else {
            v = mod(v, 1.0);
        }
    } else {
        v = 1.0 - mod(v, 1.0);
    }

    if (hsv) {
        color.rgb = hsv2rgb(mix(rgb2hsv(color1.rgb), rgb2hsv(color2.rgb), clamp(v, 0.0, 1.0)));
    } else {
       color.rgb = mix(color1.rgb, color2.rgb, clamp(v, 0.0, 1.0));
    }

    return color;
}

#pragma glslify: export(Ducks);

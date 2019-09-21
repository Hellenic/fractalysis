#pragma glslify: rgb2hsv = require('./rgb2hsv.glsl')
#pragma glslify: hsv2rgb = require('./hsv2rgb.glsl')

float _bailout = exp(bailout);
float log2Bailout = log(2.0 * log(_bailout));
float logPower = log(abs(power));

vec4 colorMapping(float n, vec2 z) {
    vec3 color = color3,
        c1 = color1,
        c2 = color2;

    if (hsv) {
        c1 = rgb2hsv(c1);
        c2 = rgb2hsv(c2);
    }

    if (colorMode == 3) {
        color = atan(z.y, z.x) > 0.0 ? c1 : c2;

    } else if (colorMode == 4) {
        color = mod(n, 2.0) == 0.0 ? c1 : c2;

    } else if (colorMode == 5) {
        color = (abs(z.x) < bailout / 2.0 || abs(z.y) < bailout / 2.0) ? c1 : c2;

    } else if (colorMode == 6) {
        float v = 0.5 * sin(floor(colorScale) * complexArg(z)) + 0.5;
        color = mix(c1, c2, v);
    } else {
        float v = abs(1.0 - n / float(maxIterations));
        float v0 = v;
        float vp, v1;

        if (colorMode != 2) {
            // Smooth colouring
            // From: http://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_.28smooth.29_coloring
            vp = abs((log2Bailout - log(log(abs(length(z))))) / logPower);
            v1 = abs(1.0 - (n + 1.0) / float(maxIterations));

            if (colorMode == 1) {
                if (n == 0.0) {
                    v = v - (v - v1) * vp;
                } else {
                    v = v1 - (v1 - v) * vp;
                }
            } else {
                v = v + (v1 - v) * vp;
            }
        }
        
        if (colorMode == 2 && n == 0.0) v = 1.0;

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
            color = hsv2rgb(mix(c1, c2, clamp(v, 0.0, 1.0)));
        } else {
           color = mix(c1, c2, clamp(v, 0.0, 1.0));
        }
    }

    return vec4(color, 1.0);
}

#pragma glslify: export(colorMapping)

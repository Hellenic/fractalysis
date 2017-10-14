#define maxIterations 50

uniform float power;
uniform int   minIterations;
uniform bool  juliaMode;
uniform vec2  offset;

uniform vec3  color1;
uniform bool  transparent;
uniform float iterationColorBlend;

uniform vec2  orbitTrapOffset;
uniform float orbitTrapScale;
uniform float orbitTrapEdgeDetail;
uniform float orbitTrapRotation;
uniform float orbitTrapSpin;
uniform sampler2D texture;

// Pre-calculations
float otrc = cos(radians(orbitTrapRotation));
float otrs = sin(radians(orbitTrapRotation));
mat2  orbitRotation = mat2(otrc, otrs, -otrs, otrc);

float otsc = cos(radians(orbitTrapSpin));
float otss = sin(radians(orbitTrapSpin));
mat2  orbitSpin = mat2(otsc, otss, -otss, otsc);

vec4 orbitMapping(vec4 c, vec2 w)
{
    vec4 color = vec4(0);
    vec2 sp = 0.5 + (w / orbitTrapScale * orbitRotation - orbitTrapOffset) * orbitSpin;

    vec4 s = texture2D(texture, sp);
    if (s.a > 0.0) c = mix(c, s, s.a);

    return c;
}

vec4 OrbitTrap(vec2 z) {
    vec4  color = vec4(color1, 0.0);
    float n = 0.0;
    vec2  c = juliaMode ? offset : z;

    for (int i = 0; i < int(maxIterations); i++) {
        n += 1.0;
        z = complexPower(z, power) + c;

        if (n >= float(minIterations)) {
            color = orbitMapping(color, z);
            if (color.a >= orbitTrapEdgeDetail) {
              break;
            }
        }
    }

    if (iterationColorBlend > 0.0) {
        float blend = clamp(1.0 - (n / float(maxIterations)) * iterationColorBlend, 0.0, 1.0);
        color.rgb = mix(color1, color.rgb, blend);
    }

    if (!transparent) {
      color.a = 1.0;
    }

    return color;
}

#pragma glslify: export(OrbitTrap);

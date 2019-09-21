/**
 * Fractalysis master fragment shader
 *
 * This shader composes multiple other shaders together to create
 * a fragment shader that can render complex fractal flames.
 *
 * This work is heavily based on Fractal Lab's shaders by Tom Beddard, licensed under GPL v3. Mad props to him!
*/
#ifdef GL_FRAGMENT_PRECISION_HIGH
   precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;
#define GLSLIFY 1

// Complex math operations
#define complexMult(a,b) vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x)
#define complexMag(z) float(pow(length(z), 2.0))
#define complexReciprocal(z) vec2(z.x / complexMag(z), -z.y / complexMag(z))
#define complexDivision(a,b) complexMult(a, complexReciprocal(b))
#define complexArg(z) float(atan(z.y, z.x))
#define complexLog(z) vec2(log(length(z)), complexArg(z))
#define complexExp(z) vec2(exp(z.x) * cos(z.y), exp(z.x) * sin(z.y))
#define sinh(x) float((exp(x) - exp(-x)) / 2.0)
#define cosh(x) float((exp(x) + exp(-x)) / 2.0)
#define complexSin(z) vec2(sin(z.x) * cosh(z.y), cos(z.x) * sinh(z.y))
#define complexCos(z) vec2(cos(z.x) * cosh(z.y), -sin(z.x) * sinh(z.y))
#define complexTan(z) vec2(sin(2.0 * z.x)/(cos(2.0 * z.x) + cosh(2.0 * z.y)), sinh(2.0 * z.y)/(cos(2.0 * z.x) + cosh(2.0 * z.y)))
#define complexSinh(z) vec2(sinh(z.x) * cos(z.y), cosh(z.x) * sin(z.y))
#define complexCosh(z) vec2(cosh(z.x) * cos(z.y), sinh(z.x) * sin(z.y))
#define complexTanh(z) vec2(sinh(2.0 * z.x)/(cosh(2.0 * z.a) + cos(2.0 * z.y)), sin(2.0 * z.y)/(cosh(2.0 * z.x) + cos(2.0 * z.y)))
#define polar(r,a) vec2(cos(a) * r, sin(a) * r)
#define complexPower(z,p) vec2(polar(pow(length(z), float(p)), float(p) * complexArg(z)))
#define complexPower2(z, p) vec2(complexExp(complexMult(p, complexLog(z)))) // x^y = exp(y * log(x))

// Statics
#define antialiasing 0.5

// Uniforms
uniform float rotation;
uniform vec3  cameraPosition;
uniform vec2  size;
uniform vec2  outputSize;
uniform float gamma;

// Pre-calculations
float aspectRatio = outputSize.x / outputSize.y;

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

// Shared variables
mat2  rotationMatrix;

vec4 render(vec2 pixel) {
    vec2 z = ((pixel - (size * 0.5)) / size) * vec2(aspectRatio, 1.0) * cameraPosition.z + cameraPosition.xy;
    z *= rotationMatrix;

    return OrbitTrap(z);
}

void main() {
  vec4 color = vec4(0.0);
  float n = 0.0;

  float rc = cos(radians(rotation));
  float rs = sin(radians(rotation));
  rotationMatrix = mat2(rc, rs, -rs, rc);

  #ifdef antialiasing
      for (float x = 0.0; x < 1.0; x += float(antialiasing)) {
          for (float y = 0.0; y < 1.0; y += float(antialiasing)) {
              color += render(gl_FragCoord.xy + vec2(x, y));
              n += 1.0;
          }
      }
      color /= n;
  #else
      color = render(gl_FragCoord.xy);
  #endif

  // Less than 1/255
  if (color.a < 0.00392)
    discard;

  gl_FragColor = vec4(pow(color.rgb, vec3(1.0 / gamma)), color.a);
}

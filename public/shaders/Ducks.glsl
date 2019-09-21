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
vec3 hsv2rgb(vec3 _hsv)
{
    float h, s, v, r, g, b, j, p, q, t;
    int i;
    vec3 color;

    h = _hsv.x;
    s = _hsv.y;
    v = _hsv.z;

    if (h == 1.0) {
  		h = 0.0;
  	}

    if (v == 0.0) {
        // No brightness so return black
        color = vec3(0.0);

    } else if (s == 0.0) {
        // No saturation so return grey
        color = vec3(v);

    } else {
		// RGB color
        h *= 6.0;
		i = int(floor(h));
		j = h - float(i);

		p = v * (1.0 - s);
		q = v * (1.0 - (s * j));
		t = v * (1.0 - (s * (1.0 - j)));

		if (i == 0) {
			r = v;
			g = t;
			b = p;
		} else if (i == 1) {
			r = q;
			g = v;
			b = p;
		} else if (i == 2) {
			r = p;
			g = v;
			b = t;
		} else if (i == 3) {
			r = p;
			g = q;
			b = v;
		} else if (i == 4) {
			r = t;
			g = p;
			b = v;
		} else if (i == 5) {
			r = v;
			g = p;
			b = q;
		}
		color = vec3(r, g, b);
	}

    return color;
}

// RGB to HSV
// http://www.easyrgb.com/index.php?X=MATH&H=20#text20
vec3 rgb2hsv(vec3 color)
{
    float rgb_min = min(color.r, min(color.g, color.b));
    float rgb_max = max(color.r, max(color.g, color.b));
    float rgb_delta = rgb_max - rgb_min;

    float v = rgb_max;
    float h, s;

    if (rgb_delta == 0.0) {
        // Grey
        h = 0.0;
        s = 0.0;
    } else {
        // Colour
        s = rgb_delta / rgb_max;
        float r_delta = (((rgb_max - color.r) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
        float g_delta = (((rgb_max - color.g) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
        float b_delta = (((rgb_max - color.b) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;

        if (color.r == rgb_max) {
            h = b_delta - g_delta;
        } else if (color.g == rgb_max) {
            h = 1.0 / 3.0 + r_delta - b_delta;
        } else if (color.b == rgb_max) {
            h = 2.0 / 3.0 + g_delta - r_delta;
        }

        if (h < 0.0) h += 1.0;
        if (h > 1.0) h -= 1.0;
    }

    return vec3(h, s, v);
}

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

// Shared variables
mat2  rotationMatrix;

vec4 render(vec2 pixel) {
    vec2 z = ((pixel - (size * 0.5)) / size) * vec2(aspectRatio, 1.0) * cameraPosition.z + cameraPosition.xy;
    z *= rotationMatrix;

    return Ducks(z);
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

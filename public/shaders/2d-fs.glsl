/**
 * Original work:
 * ========================
 * Fractal Lab's 2D fractal shader
 * Last update: 10 March 2011
 *
 * Changelog:
 *      0.1     - Initial release
 *      0.2     - Added orbit trap option
 *      0.3     - Added 'Ducks' formula by Samuel Monnier
 *
 * Copyright 2011, Tom Beddard
 * http://www.subblue.com
 *
 * For more generative graphics experiments see:
 * http://www.subblue.com
 *
 * Licensed under the GPL Version 3 license.
 * http://www.gnu.org/licenses/
 *
*/

#ifdef GL_FRAGMENT_PRECISION_HIGH
   precision highp float;
#else
  precision mediump float;
#endif
precision mediump int;

#define dE Mandelbrot
#define dEMandelbrot 1 // TODO This should be uniform
#define maxIterations 50
#define antialiasing 0.5

uniform float power;
uniform float bailout;
uniform int   minIterations;

uniform bool  juliaMode;
uniform vec2  offset;

uniform int   colorMode;
uniform int   bailoutStyle;
uniform float colorScale;
uniform float colorCycle;
uniform float colorCycleOffset;
uniform bool  colorCycleMirror;
uniform bool  hsv;
uniform float iterationColorBlend;

uniform vec3  color1;
uniform vec3  color2;
uniform vec3  color3;
uniform float gamma;

uniform bool  orbitTrap;
uniform vec2  orbitTrapOffset;
uniform float orbitTrapScale;
uniform float orbitTrapEdgeDetail;
uniform float orbitTrapRotation;
uniform float orbitTrapSpin;
uniform sampler2D texture;

uniform float rotation;
uniform vec3  cameraPosition;
uniform vec2  size;
uniform vec2  outputSize;

float aspectRatio = outputSize.x / outputSize.y;
mat2  rotationMatrix;
mat2  orbitRotation;
mat2  orbitSpin;

#define BAILOUT 4.0
#define LOG2 float(log(2.0))

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

// x^y = exp(y * log(x))
#define complexPower2(z, p) vec2(complexExp(complexMult(p, complexLog(z))))

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

vec3 hsv2rgb(vec3 hsv)
{
    float h, s, v, r, g, b, j, p, q, t;
    int i;
    vec3 color;

    h = hsv.x;
    s = hsv.y;
    v = hsv.z;

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

#ifdef dEMandelbrot

float _bailout = exp(bailout);
float log2Bailout = log(2.0 * log(_bailout));
float logPower = log(abs(power));

bool bailoutLimit(vec2 z) {
    bool bailing = false;

    if (bailoutStyle == 3 && (pow(z.x, 2.0) - pow(z.y, 2.0)) >= _bailout) {
        bailing = true;

    } else if (bailoutStyle == 4 && (z.y * z.y - z.y * z.x) >= bailout) {
        bailing = true;

    } else if (bailoutStyle == 2 && (pow(z.y, 2.0) - pow(z.x, 2.0)) >= _bailout) {
        bailing = true;

    } else if (bailoutStyle == 1 && (abs(z.x) > bailout || abs(z.y) > _bailout)) {
        bailing = true;

    } else if (dot(z, z) >= _bailout) {
        bailing = true;
    }

    return bailing;
}


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

#endif

vec4 render(vec2 pixel) {
    vec2 z = ((pixel - (size * 0.5)) / size) * vec2(aspectRatio, 1.0) * cameraPosition.z + cameraPosition.xy;
    z *= rotationMatrix;

    return dE(z);
}

void main()
{
    vec4 color = vec4(0.0);
    float n = 0.0;

    float rc = cos(radians(rotation));
    float rs = sin(radians(rotation));
    rotationMatrix = mat2(rc, rs, -rs, rc);

#ifdef dEOrbitTrap

    float otrc = cos(radians(orbitTrapRotation));
    float otrs = sin(radians(orbitTrapRotation));
    orbitRotation = mat2(otrc, otrs, -otrs, otrc);

    float otsc = cos(radians(orbitTrapSpin));
    float otss = sin(radians(orbitTrapSpin));
    orbitSpin = mat2(otsc, otss, -otss, otsc);

#endif


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

#define maxIterations 8

uniform float power;
uniform float bailout;
uniform vec3  offset;

uniform int   colorIterations;
uniform mat3  objectRotation;

uniform float juliaFactor;
uniform float radiolariaFactor;
uniform float radiolaria;

// Scalar derivative approach by Enforcer:
// http://www.fractalforums.com/mandelbulb-implementation/realtime-renderingoptimisations/
void powN(float p, inout vec3 z, float zr0, inout float dr)
{
    float zo0 = asin(z.z / zr0);
    float zi0 = atan(z.y, z.x);
    float zr = pow(zr0, p - 1.0);
    float zo = zo0 * p;
    float zi = zi0 * p;
    float czo = cos(zo);

    dr = zr * dr * p + 1.0;
    zr *= zr0;

    z = zr * vec3(czo * cos(zi), czo * sin(zi), sin(zo));
}

// The fractal calculation
//
// Calculate the closest distance to the fractal boundary and use this
// distance as the size of the step to take in the ray marching.
//
// Fractal formula:
//    z' = z^p + c
//
// For each iteration we also calculate the derivative so we can estimate
// the distance to the nearest point in the fractal set, which then sets the
// maxiumum step we can move the ray forward before having to repeat the calculation.
//
//   dz' = p * z^(p-1)
//
// The distance estimation is then calculated with:
//
//   0.5 * |z| * log(|z|) / |dz|
//
vec3 Mandelbulb(vec3 w)
{
    w *= objectRotation;

    vec3 z = w;
    vec3 c = mix(w, offset, juliaFactor);
    vec3 d = w;
    float dr = 1.0;
    float r  = length(z);
    float md = 10000.0;

    for (int i = 0; i < int(maxIterations); i++) {
        powN(power, z, r, dr);

        z += c;

        if (z.y > radiolariaFactor) {
            z.y = mix(z.y, radiolariaFactor, radiolaria);
        }

        r = length(z);

        if (i < colorIterations) {
            md = min(md, r);
            d = z;
        }

        if (r > bailout) break;
    }

    return vec3(0.5 * log(r) * r / dr, md, 0.33 * log(dot(d, d)) + 1.0);
}
#pragma glslify: export(Mandelbulb);

#define maxIterations 8

uniform float scale;
uniform vec3  offset;
uniform vec3  shift;

uniform int   colorIterations;
uniform mat3  objectRotation;
uniform mat3  fractalRotation1;
uniform mat3  fractalRotation2;

uniform float phi;

// Pre-calculations
vec3 scale_offset = offset * (scale - 1.0);

float IKVNORM = 1.0 / sqrt(pow(phi * (1.0 + phi), 2.0) + pow(phi * phi - 1.0, 2.0) + pow(1.0 + phi, 2.0));
float C1 = phi * (1.0 + phi) * IKVNORM;
float C2 = (phi * phi - 1.0) * IKVNORM;
float C3 = (1.0 + phi) * IKVNORM;

vec3 phi3 = vec3(0.5, 0.5 / phi, 0.5 * phi);
vec3 c   = vec3(C1, C2, C3);

vec3 DodecahedronIFS(vec3 w)
{
    w *= objectRotation;
    float d, t;
    float md = 1000.0, cd = 0.0;

    for (int i = 0; i < int(maxIterations); i++) {
        w *= fractalRotation1;
        w = abs(w + shift) - shift;

        t = w.x * phi3.z + w.y * phi3.y - w.z * phi3.x;
        if (t < 0.0) w += vec3(-2.0, -2.0, 2.0) * t * phi3.zyx;

        t = -w.x * phi3.x + w.y * phi3.z + w.z * phi3.y;
        if (t < 0.0) w += vec3(2.0, -2.0, -2.0) * t * phi3.xzy;

        t = w.x * phi3.y - w.y * phi3.x + w.z * phi3.z;
        if (t < 0.0) w += vec3(-2.0, 2.0, -2.0) * t * phi3.yxz;

        t = -w.x * c.x + w.y * c.y + w.z * c.z;
        if (t < 0.0) w += vec3(2.0, -2.0, -2.0) * t * c.xyz;

        t = w.x * c.z - w.y * c.x + w.z * c.y;
        if (t < 0.0) w += vec3(-2.0, 2.0, -2.0) * t * c.zxy;

        w *= fractalRotation2;
        w *= scale;
        w -= scale_offset;

        // Record minimum orbit for colouring
        d = dot(w, w);

        if (i < colorIterations) {
            md = min(md, d);
            cd = d;
        }
    }

    return vec3((length(w) - 2.0) * pow(scale, -float(maxIterations)), md, cd);
}
#pragma glslify: export(DodecahedronIFS);

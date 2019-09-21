#define maxIterations 8

uniform float scale;
uniform vec3  offset;
uniform vec3  shift;

uniform int   colorIterations;
uniform mat3  objectRotation;
uniform mat3  fractalRotation1;
uniform mat3  fractalRotation2;

// Pre-calculations
vec3 scale_offset = offset * (scale - 1.0);

vec3 OctahedralIFS(vec3 w)
{
    w *= objectRotation;
    float d, t;
    float md = 1000.0, cd = 0.0;

    for (int i = 0; i < int(maxIterations); i++) {
        w *= fractalRotation1;
        w = abs(w + shift) - shift;

        // Octahedral
        if (w.x < w.y) w.xy = w.yx;
        if (w.x < w.z) w.xz = w.zx;
        if (w.y < w.z) w.yz = w.zy;

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

#pragma glslify: export(OctahedralIFS);

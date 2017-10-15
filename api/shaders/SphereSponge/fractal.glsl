#define maxIterations 8

uniform float scale;
uniform vec3  offset;

uniform int   colorIterations;
uniform mat3  objectRotation;

uniform float sphereHoles;
uniform float sphereScale;

vec3 SphereSponge(vec3 w)
{
    w *= objectRotation;
    float k = scale;
    float d = -10000.0;
    float d1, r, md = 100000.0, cd = 0.0;

    for (int i = 0; i < int(maxIterations); i++) {
        vec3 zz = mod(w * k, sphereHoles) - vec3(0.5 * sphereHoles) + offset;
        r = length(zz);

        // Distance to the edge of the sphere (positive inside)
        d1 = (sphereScale - r) / k;
        k *= scale;

        // Intersection
        d = max(d, d1);

        if (i < colorIterations) {
            md = min(md, d);
            cd = r;
        }
    }

    return vec3(d, cd, md);
}

#pragma glslify: export(SphereSponge);

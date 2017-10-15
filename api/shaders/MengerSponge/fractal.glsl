#define maxIterations 8

uniform float scale;
uniform vec3  offset;

uniform int   colorIterations;
uniform mat3  objectRotation;

uniform mat3  fractalRotation1;

// Pre-calculations
vec3 halfSpongeScale = vec3(0.5) * scale;

vec3 MengerSponge(vec3 w)
{
    w *= objectRotation;
    w = (w * 0.5 + vec3(0.5)) * scale;  // scale [-1, 1] range to [0, 1]

    vec3 v = abs(w - halfSpongeScale) - halfSpongeScale;
    float d1 = max(v.x, max(v.y, v.z));     // distance to the box
    float d = d1;
    float p = 1.0;
    float md = 10000.0;
    vec3 cd = v;

    for (int i = 0; i < int(maxIterations); i++) {
        vec3 a = mod(3.0 * w * p, 3.0);
        p *= 3.0;

        v = vec3(0.5) - abs(a - vec3(1.5)) + offset;
        v *= fractalRotation1;

        // distance inside the 3 axis aligned square tubes
        d1 = min(max(v.x, v.z), min(max(v.x, v.y), max(v.y, v.z))) / p;

        // intersection
        d = max(d, d1);

        if (i < colorIterations) {
            md = min(md, d);
            cd = v;
        }
    }

    // The distance estimate, min distance, and fractional iteration count
    return vec3(d * 2.0 / scale, md, dot(cd, cd));
}

#pragma glslify: export(MengerSponge);

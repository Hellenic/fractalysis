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
#define HALFPI 1.570796
#define MIN_EPSILON 6e-7
#define MIN_NORM 1.5e-7
#define minRange 6e-5
#define stepLimit 60
#define aoIterations 4
#define antialiasing 0.5

// Common uniforms
uniform float cameraRoll;
uniform float cameraPitch;
uniform float cameraYaw;
uniform float cameraFocalLength;
uniform vec3  cameraPosition;

uniform float boundingRadius;
uniform float surfaceDetail;
uniform float surfaceSmoothness;

uniform vec3  background1Color;
uniform vec3  background2Color;
uniform vec3  light;
uniform vec2  ambientColor;
uniform float fog;
uniform float fogFalloff;

uniform float specularity;
uniform float specularExponent;

uniform vec3  color1;
uniform float color1Intensity;
uniform vec3  color2;
uniform float color2Intensity;
uniform vec3  color3;
uniform float color3Intensity;

uniform vec3  innerGlowColor;
uniform float innerGlowIntensity;
uniform vec3  outerGlowColor;
uniform float outerGlowIntensity;
uniform float aoIntensity;
uniform float aoSpread;

uniform vec2  size;
uniform vec2  outputSize;
uniform float gamma;
uniform bool  transparent;

// Pre-calculations
float aspectRatio = outputSize.x / outputSize.y;
float fovfactor = 1.0 / sqrt(1.0 + cameraFocalLength * cameraFocalLength);
float pixelScale = 1.0 / min(outputSize.x, outputSize.y);
float epsfactor = 2.0 * fovfactor * pixelScale * surfaceDetail;
vec3  w = vec3(0, 0, 1);
vec3  v = vec3(0, 1, 0);
vec3  u = vec3(1, 0, 0);

#define maxIterations 8

uniform float scale;
uniform vec3  offset;

uniform int   colorIterations;
uniform mat3  objectRotation;
uniform mat3  fractalRotation1;
uniform mat3  fractalRotation2;

uniform float sphereScale;
uniform float boxScale;
uniform float boxFold;
uniform float fudgeFactor;

// Pre-calculations
float mR2 = boxScale * boxScale;    // Min radius
float fR2 = sphereScale * mR2;      // Fixed radius
vec2  scaleFactor = vec2(scale, abs(scale)) / mR2;

// Details about the Mandelbox DE algorithm:
// http://www.fractalforums.com/3d-fractal-generation/a-mandelbox-distance-estimate-formula/
vec3 Mandelbox(vec3 w)
{
    w *= objectRotation;
    float md = 1000.0;
    vec3 c = w;

    // distance estimate
    vec4 p = vec4(w.xyz, 1.0),
        p0 = vec4(w.xyz, 1.0);  // p.w is knighty's DEfactor

    for (int i = 0; i < int(maxIterations); i++) {
        // box fold:
        // if (p > 1.0) {
        //   p = 2.0 - p;
        // } else if (p < -1.0) {
        //   p = -2.0 - p;
        // }
        p.xyz = clamp(p.xyz, -boxFold, boxFold) * 2.0 * boxFold - p.xyz;
        p.xyz *= fractalRotation1;

        // sphere fold:
        // if (d < minRad2) {
        //   p /= minRad2;
        // } else if (d < 1.0) {
        //   p /= d;
        // }
        float d = dot(p.xyz, p.xyz);
        p.xyzw *= clamp(max(fR2 / d, mR2), 0.0, 1.0);  // sphere fold

        p.xyzw = p * scaleFactor.xxxy + p0 + vec4(offset, 0.0);
        p.xyz *= fractalRotation2;

        if (i < colorIterations) {
            md = min(md, d);
            c = p.xyz;
        }
    }

    // Return distance estimate, min distance, fractional iteration count
    return vec3((length(p.xyz) - fudgeFactor) / p.w, md, 0.33 * log(dot(c, c)) + 1.0);
}

// Shared variables
mat3  cameraRotation;

// Return rotation matrix for rotating around vector v by angle
mat3 rotationMatrixVector(vec3 v, float angle)
{
    float c = cos(radians(angle));
    float s = sin(radians(angle));

    return mat3(c + (1.0 - c) * v.x * v.x, (1.0 - c) * v.x * v.y - s * v.z, (1.0 - c) * v.x * v.z + s * v.y,
              (1.0 - c) * v.x * v.y + s * v.z, c + (1.0 - c) * v.y * v.y, (1.0 - c) * v.y * v.z - s * v.x,
              (1.0 - c) * v.x * v.z - s * v.y, (1.0 - c) * v.y * v.z + s * v.x, c + (1.0 - c) * v.z * v.z);
}

// Define the ray direction from the pixel coordinates
vec3 rayDirection(vec2 pixel)
{
    vec2 p = (0.5 * size - pixel) / vec2(size.x, -size.y);
    p.x *= aspectRatio;
    vec3 d = (p.x * u + p.y * v - cameraFocalLength * w);

    return normalize(cameraRotation * d);
}

// Intersect bounding sphere
//
// If we intersect then set the tmin and tmax values to set the start and
// end distances the ray should traverse.
bool intersectBoundingSphere(vec3 origin, vec3 direction, out float tmin, out float tmax)
{
    bool hit = false;
    float b = dot(origin, direction);
    float c = dot(origin, origin) - boundingRadius;
    float disc = b*b - c;
    tmin = tmax = 0.0;

    if (disc > 0.0) {
        // Real root of disc, so intersection
        float sdisc = sqrt(disc);
        float t0 = -b - sdisc;          // closest intersection distance
        float t1 = -b + sdisc;          // furthest intersection distance

        if (t0 >= 0.0) {
            // Ray intersects front of sphere
            tmin = t0;
            tmax = t0 + t1;
        } else if (t0 < 0.0) {
            // Ray starts inside sphere
            tmax = t1;
        }
        hit = true;
    }

    return hit;
}

// // Calculate the gradient in each dimension from the intersection point
vec3 generateNormal(vec3 z, float d)
{
    float e = max(d * 0.5, MIN_NORM);

    float dx1 = Mandelbox(z + vec3(e, 0, 0)).x;
    float dx2 = Mandelbox(z - vec3(e, 0, 0)).x;

    float dy1 = Mandelbox(z + vec3(0, e, 0)).x;
    float dy2 = Mandelbox(z - vec3(0, e, 0)).x;

    float dz1 = Mandelbox(z + vec3(0, 0, e)).x;
    float dz2 = Mandelbox(z - vec3(0, 0, e)).x;

    return normalize(vec3(dx1 - dx2, dy1 - dy2, dz1 - dz2));
}

// Ambient occlusion approximation.
// Based upon boxplorer's implementation which is derived from:
// http://www.iquilezles.org/www/material/nvscene2008/rwwtt.pdf
float ambientOcclusion(vec3 p, vec3 n, float eps)
{
    float o = 1.0;                  // Start at full output colour intensity
    eps *= aoSpread;                // Spread diffuses the effect
    float k = aoIntensity / eps;    // Set intensity factor
    float d = 2.0 * eps;            // Start ray a little off the surface

    for (int i = 0; i < aoIterations; ++i) {
        o -= (d - Mandelbox(p + n * d).x) * k;
        d += eps;
        k *= 0.5;                   // AO contribution drops as we move further from the surface
    }

    return clamp(o, 0.0, 1.0);
}

// Blinn phong shading model
// http://en.wikipedia.org/wiki/BlinnPhong_shading_model
// base color, incident, point of intersection, normal
vec3 blinnPhong(vec3 color, vec3 p, vec3 n)
{
    // Ambient colour based on background gradient
    vec3 ambColor = clamp(mix(background2Color, background1Color, (sin(n.y * HALFPI) + 1.0) * 0.5), 0.0, 1.0);
    ambColor = mix(vec3(ambientColor.x), ambColor, ambientColor.y);

    vec3  halfLV = normalize(light - p);
    float diffuse = max(dot(n, halfLV), 0.0);
    float specular = pow(diffuse, specularExponent);

    return ambColor * color + color * diffuse + specular * specularity;
}

// Calculate the output colour for each input pixel
vec4 render(vec2 pixel)
{
    vec3  ray_direction = rayDirection(pixel);
    float ray_length = minRange;
    vec3  ray = cameraPosition + ray_length * ray_direction;
    vec4  bg_color = vec4(clamp(mix(background2Color, background1Color, (sin(ray_direction.y * HALFPI) + 1.0) * 0.5), 0.0, 1.0), 1.0);
    vec4  color = bg_color;

    float eps = MIN_EPSILON;
    vec3  dist;
    vec3  normal = vec3(0);
    int   steps = 0;
    bool  hit = false;
    float tmin = 0.0;
    float tmax = 10000.0;

    if (intersectBoundingSphere(ray, ray_direction, tmin, tmax)) {
        ray_length = tmin;
        ray = cameraPosition + ray_length * ray_direction;

        for (int i = 0; i < stepLimit; i++) {
            steps = i;
            dist = Mandelbox(ray);
            dist.x *= surfaceSmoothness;

            // If we hit the surface on the previous step check again to make sure it wasn't
            // just a thin filament
            if (hit && dist.x < eps || ray_length > tmax || ray_length < tmin) {
                steps--;
                break;
            }

            hit = false;
            ray_length += dist.x;
            ray = cameraPosition + ray_length * ray_direction;
            eps = ray_length * epsfactor;

            if (dist.x < eps || ray_length < tmin) {
                hit = true;
            }
        }
    }

    // Found intersection?
    float glowAmount = float(steps) / float(stepLimit);
    float glow;

    if (hit) {
        float aof = 1.0, shadows = 1.0;
        glow = clamp(glowAmount * innerGlowIntensity * 3.0, 0.0, 1.0);

        if (steps < 1 || ray_length < tmin) {
            normal = normalize(ray);
        } else {
            normal = generateNormal(ray, eps);
            aof = ambientOcclusion(ray, normal, eps);
        }

        color.rgb = mix(color1, mix(color2, color3, dist.y * color2Intensity), dist.z * color3Intensity);
        color.rgb = blinnPhong(clamp(color.rgb * color1Intensity, 0.0, 1.0), ray, normal);
        color.rgb *= aof;
        color.rgb = mix(color.rgb, innerGlowColor, glow);
        color.rgb = mix(bg_color.rgb, color.rgb, exp(-pow(ray_length * exp(fogFalloff), 2.0) * fog));
        color.a = 1.0;
    } else {
        // Apply outer glow and fog
        ray_length = tmax;
        color.rgb = mix(bg_color.rgb, color.rgb, exp(-pow(ray_length * exp(fogFalloff), 2.0)) * fog);
        glow = clamp(glowAmount * outerGlowIntensity * 3.0, 0.0, 1.0);
        color.rgb = mix(color.rgb, outerGlowColor, glow);
        if (transparent)
          color = vec4(0.0);
    }

    return color;
}

void main() {
  vec4 color = vec4(0.0);
  float n = 0.0;

  cameraRotation = rotationMatrixVector(v, 180.0 - cameraYaw) * rotationMatrixVector(u, -cameraPitch) * rotationMatrixVector(w, cameraRoll);

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

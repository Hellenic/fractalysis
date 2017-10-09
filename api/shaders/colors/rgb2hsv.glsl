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

#pragma glslify: export(rgb2hsv)

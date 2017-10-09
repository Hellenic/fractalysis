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

#pragma glslify: export(hsv2rgb)

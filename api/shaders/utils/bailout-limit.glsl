float _bailout = exp(bailout);

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

#pragma glslify: export(bailoutLimit)

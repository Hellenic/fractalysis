# Fractalysis

An interactive fractal flame editor.

This is an attempt to create a easy-to-use, online editor to create fancy looking images –
more accurately, [fractal flames](https://en.wikipedia.org/wiki/Fractal_flame).

Goal of this project is to achieve same, and more, as with old Apophysis. Here's some example
of what I want this project to be capable of: [Apophysis on Google Photos @hkarkk](https://photos.google.com/share/AF1QipMnab4yKkrYEMaI1AaY3SGvRa6WHXy-vz3nwIhHF3DHdu8pgJTBJWZ30GpnW7nwbg?key=VUNnOHUzQmxoR1N4Sk9NTGlRSVFKcS0wUTN1RmJR)

> This project is work in progress!
> While the basic structure is already there, majority of features are still not there.

## How to get started

1.  `npm install`
2.  `npm start`

## How it works

Basically, there's the shaders that do the heavy lifting. Those shaders can take in
some parameters, that affect the outcome. Combine those, and final product is a fractal flame, rendered on a canvas with WebGL.

This platform will provide a set of (composable) shaders, that the user can choose from which to use
and how to combine them together. Each shader will have it's own specific set of features and how it
affects the outcome.

Each shader has a set of parameters (uniforms), which as well, can affect the outcome. For all those parameters,
a configuration panel will be generated so the user can easily change any setting, to adjust the final render.

User may also save their shader selections and configurations to a preset, to come back to them later.
It is also possible to render and download an image of the current set.

## TODO

- [ ] Consider using https://github.com/hugozap/react-rotary-knob
- [ ] Refactoring: All remaining JS files to TS
- [ ] Refactoring: Clean all the TODOs
- [ ] Controls: Continue on Camera control with mouse
- [ ] Shader composing (e.g. Mandelbrot + Bloom + HDR)

## Inspiration

This project draws inspiration from [Apophysis](http://www.apophysis.org/) and [Fractal Lab](http://sub.blue/fractal-lab)

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Credits & references

Parts of this application (like shaders, or algorithms) are based on work other people have done. Here's a few:

- http://www.algorithmic-worlds.net/blog/blog.php?Post=20110227
- Fractal Lab, Tom Beddard http://sub.blue/fractal-lab
- http://www.fractalforums.com/3d-fractal-generation/a-mandelbox-distance-estimate-formula/
- http://www.fractalforums.com/3d-fractal-generation/revenge-of-the-half-eaten-menger-sponge/msg21700/
- http://www.fractalforums.com/sierpinski-gasket/kaleidoscopic-(escape-time-ifs)/msg16982/#msg16982
- http://www.fractalforums.com/3d-fractal-generation/
- And of course all the open source libraries used

Big thanks! :pray:

# License

Majority of this project is licensed under MIT. If file does not otherwise mention,
it's MIT.

Some of the files, or part of them, are 3rd party and licensed under GPL v3. Files that
have this licensing, mention it in the comment on top of the file.

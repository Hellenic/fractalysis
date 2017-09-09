# Fractalysis

An interactive fractal flame editor.

This is an attempt to create a easy-to-use, online editor to create fancy looking images –
more accurately, [fractal flames](https://en.wikipedia.org/wiki/Fractal_flame).

Goal of this project is to achieve same, and more, as with old Apophysis. Here's some example
of what I want this project to be capable of: [Apophysis on Google Photos @hkarkk](https://photos.google.com/share/AF1QipMnab4yKkrYEMaI1AaY3SGvRa6WHXy-vz3nwIhHF3DHdu8pgJTBJWZ30GpnW7nwbg?key=VUNnOHUzQmxoR1N4Sk9NTGlRSVFKcS0wUTN1RmJR)

> This project is work in progress!
> While the basic structure is already there, majority of features are still not there.

## How it works / [will work]

Basically, there's the shaders that do the heavy lifting. Those shaders can take in
some parameters, that affect the outcome. Combine those, and final product is a fractal flame, rendered on a canvas with WebGL.

This platform will provide a set of (composable) shaders, that the user can choose from which to use
and how to combine them together. Each shader will have it's own specific set of features and how it
affects the outcome.

Each shader has a set of parameters (uniforms), which as well, can affect the outcome. For all those parameters,
a configuration panel will be generated so the user can easily change any setting, to adjust the final render.

User may also save their shader selections and configurations to a preset, to come back to them later.
It is also possible to render a high quality image (or a video) of the current set and save it for later use.

## Inspiration

This project draws inspiration from [Apophysis](http://www.apophysis.org/) and [Fractal Lab](http://sub.blue/fractal-lab)

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# License

Majority of this project is licensed under MIT. If file does not otherwise mention,
it's MIT.

Some of the files (`/public/shaders`) are 3rd party and licensed under GPL v3. Files that
have this licensing, mention it in the comment on top of the file.

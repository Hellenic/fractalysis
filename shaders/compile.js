const fs = require('fs');
const glsl = require('glslify');

// Simple script to compile the dynamic glslify shaders to static shader files

// Simple transformer to replace a variable with the shader name
const dynamicShaderTransformer = shader => (filename, src, opts) => {
  return src.replace('{{FractalShader}}', shader);
};

const compileShader = shader => {
  const WIP_SHADERS = [
    'DodecahedronIFS',
    'Mandelbox',
    'Mandelbulb',
    'MengerSponge',
    'OctahedralIFS',
    'SphereSponge'
  ];

  // TODO Eventually make all the shaders modular enough so 2D, 3D or whatever can be used though master and combined with other shaders
  // For now, for shaders that are not yet modular, load them directly
  const masterShader = WIP_SHADERS.includes(shader) ? 'master3d' : 'master';
  const shaderSrc = glsl.file(`./${masterShader}.glsl`, {
    transform: [dynamicShaderTransformer(shader)]
  });

  return shaderSrc;
};

console.log(':: 💻  Fractalysis shaders compiling...');

const ALL_SHADERS = [
  'DodecahedronIFS',
  'Ducks',
  'Mandelbox',
  'Mandelbrot',
  'Mandelbulb',
  'MengerSponge',
  'OctahedralIFS',
  'OrbitTrap',
  'SphereSponge'
];

ALL_SHADERS.forEach(shader => {
  const src = compileShader(shader);
  fs.writeFileSync(`public/shaders/${shader}.glsl`, src);
});

console.log(':: 💻  Fractalysis shaders compiled!');

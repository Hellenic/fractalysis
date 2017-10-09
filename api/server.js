const express = require('express');
const glsl = require('glslify');
const app = express();

// This is very light-weight API to compile shaders and use glslify module system

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/compile/:shader', (req, res) => {
  // const { shader } = req.params;
  const shaderSrc = glsl.file(`./shaders/master.glsl`);
  res.set('Content-Type', 'text/plain');
  res.send(shaderSrc);
});

app.listen(3001, () => {
  console.log(':: 💻  Fractalysis shader API listening on port 3001!');
});

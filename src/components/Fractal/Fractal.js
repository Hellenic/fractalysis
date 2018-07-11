import React from 'react';
import { Node } from 'gl-react';
import { Surface } from 'gl-react-dom';

const Fractal = props => {
  const shaderDef = { id: `${props.shaderId}`, type: 'ShaderID' };
  return (
    <Surface width={props.width} height={props.height}>
      <Node shader={shaderDef} uniforms={props.uniforms} />
    </Surface>
  );
};

export default Fractal;

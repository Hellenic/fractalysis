import React from 'react';
import GL from 'gl-react';
import { Surface } from "gl-react-dom";

const Draw = GL.createComponent(props =>
  <GL.Node {...props} />
);

const Fractal = props => {
  if (!props.shader) {
    return (<h3>Loading...</h3>);
  }
  return (
    <Surface width={props.width} height={props.height}>
       <Draw shader={props.shader} uniforms={props.uniforms} />
    </Surface>
  );
};

export default Fractal;

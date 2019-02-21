export interface Uniforms {
  [key: string]: any;
}

export interface WithUniformsProps {
  uniforms: Uniforms;
  shader: string;
}

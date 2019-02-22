export interface Scene {
  name: string;
  shader: string;
  uniforms: Uniforms;
}

export interface Uniforms {
  [key: string]: any;
}

export interface WithUniformsProps {
  uniforms: Uniforms;
  shader: string;
}

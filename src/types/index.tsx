export interface Scene {
  name: string;
  shader: string;
  uniforms: Uniforms;
}

export interface Uniforms {
  [key: string]: any;
}

export interface WithSceneProps {
  shader: string;
  download: boolean;
  uniforms: Uniforms;
}

import { Uniforms, Scene } from '../types/';

export function storeScene(
  presetName: string,
  shaderName: string,
  uniforms: Uniforms
): void {
  const scene = { name: presetName, shader: shaderName, uniforms } as Scene;

  const presets: Scene[] = JSON.parse(localStorage.getItem('presets') || '[]');
  presets.push(scene);

  localStorage.setItem('presets', JSON.stringify(presets));
}

export default {
  storeScene
};

import { Uniforms, Scene } from '../types/';
import Scenes from '../pages/Scenes/Scenes';

export function storeScene(
  presetName: string,
  shaderName: string,
  uniforms: Uniforms
): void {
  const scene = { name: presetName, shader: shaderName, uniforms } as Scene;

  const scenes: Scene[] = getScenes();
  scenes.push(scene);

  localStorage.setItem('presets', JSON.stringify(scenes));
}

export function getScenes(): Scene[] {
  const scenes: Scene[] = JSON.parse(localStorage.getItem('presets') || '[]');
  return scenes;
}

export default {
  storeScene,
  getScenes
};

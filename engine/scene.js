import { StartScene } from '../scenes/start.js';

let currentScene = new StartScene();

export function getCurrentScene() {
  return currentScene;
}

export function setCurrentScene(scene) {
  currentScene = scene;
}

import { destroyAllEntities } from './entity.js';

import { Scene } from '../scenes/scene.js';
import { StartScene } from '../scenes/start.js';

let currentScene = new StartScene();

export function getCurrentScene() {
  return currentScene;
}

/** @param {Scene} scene */
export function setCurrentScene(scene) {
  destroyAllEntities();

  currentScene = scene;
  currentScene.initialize();
}

export function getCurrentSceneMap() {
  return currentScene.getMap();
}

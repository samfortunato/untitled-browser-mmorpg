import { destroyAllEntities, entities } from './entity.js';

import { Scene } from '../scenes/scene.js';
import { StartScene } from '../scenes/start.js';

let currentScene = new StartScene();
// let currentScene = new Scene();

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

const TAGS_TO_ENTITIES = new Map();

/**
 * @param {string} tag
 *
 * Need to update so it can handle multiple enemies of the same class.
 * */
export function getEntityByTag(tag) {
  if (TAGS_TO_ENTITIES.has(tag)) {
    return TAGS_TO_ENTITIES.get(tag);
  } else {
    const entity = [...entities.values()].find((entity) => {
      return entity.constructor.name.toLowerCase() === tag;
    });

    TAGS_TO_ENTITIES.set(tag, entity);

    return entity;
  }
}

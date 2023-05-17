import { setupEngine } from './setup.js';
import { clear } from './draw.js';

import { StartScene } from '../scenes/start.js';

export class Game {
  currentScene = new StartScene();

  constructor() {
    this.initialize();
  }

  initialize() {
    setupEngine();

    this.currentScene.initialize();
  }

  update(timeDifference) {
    this.currentScene.update();
  }

  draw(ctx) {
    clear();

    this.currentScene.draw(ctx);
  }

  changeScene(scene) {
    this.currentScene = scene;
  }
}

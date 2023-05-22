import { setupEngine } from './setup.js';
import { clear, ctx } from './draw.js';
import { getDeltaTime } from './time.js';
import { getCurrentScene } from './scene.js';

export class Game {
  constructor() {
    this.initialize();
  }

  initialize() {
    setupEngine();

    getCurrentScene().initialize();
  }

  update(currentTimeAtStartOfFrame) {
    getCurrentScene().update(getDeltaTime(currentTimeAtStartOfFrame));
  }

  draw() {
    clear();

    getCurrentScene().draw(ctx);
  }
}

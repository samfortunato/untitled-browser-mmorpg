import { setupEngine } from './setup.js';
import { clear, ctx } from './draw.js';
import { calculateDeltaTime, getDeltaTime } from './time.js';
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
    calculateDeltaTime(currentTimeAtStartOfFrame);

    getCurrentScene().update(getDeltaTime());
  }

  draw() {
    clear();

    getCurrentScene().draw(ctx);
  }
}

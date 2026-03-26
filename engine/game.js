import { setupEngine } from './setup.js';
import { initializeScreen, ctx } from './draw.js';
import { calculateDeltaTime, getDeltaTime } from './time.js';
import { getCurrentScene } from './scene.js';
import { clearJustPressed, Input, InputManager } from './input.js';
import { Camera } from './camera.js';
import { Analytics } from './analytics.js';

/**
 * Should be a singleton.
 *
 * There should only ever be one instance of the game running on a client, no?
 * All methods can be converted into `static`.
 *
 * Maybe the game should keep track of the current scene as a static property here.
 * Idk.
 */
export class Game {
  constructor() {
    this.initialize();
  }

  initialize() {
    setupEngine();

    getCurrentScene().initialize();

    Analytics.init();
  }

  update(currentTimeAtStartOfFrame) {
    calculateDeltaTime(currentTimeAtStartOfFrame);

    InputManager.update();

    getCurrentScene().update(getDeltaTime());

    Camera.update();

    clearJustPressed();
  }

  draw() {
    initializeScreen();

    const dt = getDeltaTime();

    ctx?.save();
    ctx?.translate(-Camera.x, -Camera.y);
    getCurrentScene().draw(ctx, dt);
    ctx?.restore();

    getCurrentScene().drawUI(ctx, dt);
  }
}

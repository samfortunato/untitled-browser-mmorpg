import { setupEngine } from './setup.js';
import { initializeScreen, ctx } from './draw.js';
import { calculateDeltaTime, getDeltaTime } from './time.js';
import { getCurrentScene } from './scene.js';
import { KeyboardShortcutManager } from './keyboard-shortcut-manager.js';

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
  }

  update(currentTimeAtStartOfFrame) {
    calculateDeltaTime(currentTimeAtStartOfFrame);

    KeyboardShortcutManager.update(getDeltaTime());

    getCurrentScene().update(getDeltaTime());
  }

  draw() {
    initializeScreen();

    getCurrentScene().draw(ctx);
  }
}

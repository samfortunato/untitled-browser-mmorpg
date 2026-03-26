import { setupEngine } from './setup.js';
import { initializeScreen, ctx } from './draw.js';
import { calculateDeltaTime, getDeltaTime } from './time.js';
import { getCurrentScene } from './scene.js';
import { clearJustPressed, InputManager } from './input.js';
import { Camera } from './camera.js';
import { Analytics } from './analytics.js';
import { UI } from '../entities/ui/ui.js';

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

    const dt = getDeltaTime();
    getCurrentScene().update(dt);
    UI.update(dt);

    Camera.update();

    clearJustPressed();
  }

  draw() {
    initializeScreen();

    const dt = getDeltaTime();

    // world — drawn with camera transform
    ctx?.save();
    ctx?.translate(-Camera.x, -Camera.y);
    getCurrentScene().draw(ctx, dt);
    ctx?.restore();

    // UI — always drawn in screen space, always on top
    UI.draw(ctx);

    // overlays (dialogs, windows) — screen space, above everything
    getCurrentScene().drawOverlays(ctx, dt);
  }
}

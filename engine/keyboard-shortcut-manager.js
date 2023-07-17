import { areKeysPressed, isKeyPressed } from './input.js';
import { UIManager } from './ui.js';

import { InventoryWindow } from '../entities/ui/inventory-window.js';

/**
 * Not sure if I like the naming scheme for things like this.
 * Or how this is even coded.
 *
 * Just trying out different patterns. This is my first complex
 * game engine/game, after all.
 */
export class KeyboardShortcutManager {
  static update(dt) {
    if (areKeysPressed('i', 'I')) {
      UIManager.setCurrentlyFocusedWindow(new InventoryWindow());
    }

    if (isKeyPressed('Escape')) {
      UIManager.closeCurrentlyFocusedWindow();
    }
  }
}

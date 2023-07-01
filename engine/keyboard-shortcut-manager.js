import { areKeysPressed, isKeyPressed } from './input.js';
import { UIManager } from './ui.js';

import { InventoryWindow } from '../entities/ui/inventory-window.js';

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

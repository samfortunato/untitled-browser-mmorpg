import { addEntity } from './entity.js';

import { NullWindow } from '../entities/ui/null-window.js';

const NULL_WINDOW = new NullWindow();

export class UIManager {
  static currentlyFocusedWindow = NULL_WINDOW;

  static setCurrentlyFocusedWindow(window) {
    if (!(this.isWindowAlreadyOpen(window))) {
      this.currentlyFocusedWindow = window;
      addEntity(window);
    }
  }

  static closeCurrentlyFocusedWindow() {
    this.currentlyFocusedWindow.destroy();

    this.currentlyFocusedWindow = NULL_WINDOW;
  }

  static isWindowAlreadyOpen(window) {
    return this.currentlyFocusedWindow instanceof window.constructor;
  }
}

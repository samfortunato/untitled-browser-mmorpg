import { Entity } from '../entity.js';
import { Menu } from './menu.js';
import { ChatWindow } from './chat-window/chat-window.js';

/**
 * NOTES:
 * can make it so individual UI elements can be turned off at certain points.
 */

/** The game's UI. Menu, chat window, etc. */
export class UI extends Entity {
  menu = new Menu();
  chatWindow = new ChatWindow();

  update(dt) {
    this.menu.update(dt);
    this.chatWindow.update(dt);
  }

  draw(ctx) {
    this.menu.draw(ctx);
    this.chatWindow.draw(ctx);
  }
}

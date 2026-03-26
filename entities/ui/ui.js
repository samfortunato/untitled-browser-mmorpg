import { Entity } from '../entity.js';
import { Menu } from './menu.js';
import { ChatWindow } from './chat-window/chat-window.js';

/**
 * NOTES:
 * can make it so individual UI elements can be turned off at certain points.
 */

/** The game's UI. Menu, chat window, etc. */
// export class UI extends Entity {
//   static menu = new Menu();
//   static chatWindow = new ChatWindow();

//   static update(dt) {
//     this.menu.update(dt);
//     this.chatWindow.update(dt);
//   }

//   static draw(ctx) {
//     this.menu.draw(ctx);
//     this.chatWindow.draw(ctx);
//   }
// }

export const UI = new Entity();

UI.isUI = true;
UI.menu = new Menu();
UI.chatWindow = new ChatWindow();

UI.update = function (dt) {
  this.menu.update(dt);
  this.chatWindow.update(dt);
}

UI.draw = function (ctx) {
  this.menu.draw(ctx);
  this.chatWindow.draw(ctx);
}

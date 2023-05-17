import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { Player } from '../entities/player.js';
import { ChatWindow } from '../entities/chat-window.js';
import { Scrollable } from '../sandbox/scrollable.js';
import { TextWindow } from '../entities/text-window.js';
import { Clickable } from '../sandbox/clickable.js';

export class StartScene extends Scene {
  initialize() {
    addEntities([
      new Player(400, 400),
      new ChatWindow(),
      new Scrollable(),
      new TextWindow('hello, this is a text box.', 0, 0, 300, 200),
      new Clickable(500, 500),
    ]);
  }
}

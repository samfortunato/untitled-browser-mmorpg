import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { DebugInfo } from '../entities/debug-info.js';

import { Player } from '../entities/player/player.js';
import { ChatWindow } from '../entities/chat-window.js';
import { Scrollable } from '../sandbox/scrollable.js';
import { TextWindow } from '../entities/text-window/text-window.js';
import { Clickable } from '../sandbox/clickable.js';

export class StartScene extends Scene {
  initialize() {
    addEntities([
      new Player(400, 400),
      new Scrollable(),
      new Clickable(500, 500),
      new TextWindow('hello, this is a text box.', 20, 20, 300, 200),
      new ChatWindow(),
      new DebugInfo(16, 16),
    ]);
  }
}

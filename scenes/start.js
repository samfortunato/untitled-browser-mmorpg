import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { DebugInfo } from '../entities/debug-info.js';

import { Player } from '../entities/player/player.js';
import { ChatWindow } from '../entities/chat-window.js';
import { Scrollable } from '../entities/scrollable.js';
import { TextWindow } from '../entities/text-window/text-window.js';
import { Clickable } from '../entities/clickable.js';
import { AreaInfo } from '../entities/area-info.js';
import { EventTrigger } from '../entities/event.js';

export class StartScene extends Scene {
  initialize() {
    addEntities([
      new Scrollable(),
      new Clickable(500, 500),
      new EventTrigger(300, 300),
      new Player(400, 400),
      new TextWindow('hello, this is a text box.', 20, 20, 300, 200),
      new ChatWindow(),
      new AreaInfo(),
      new DebugInfo(16, 16),
    ]);
  }
}

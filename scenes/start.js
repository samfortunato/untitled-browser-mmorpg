import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { StartMap } from '../maps/start.js';

import { Player } from '../entities/meta/player/player.js';
import { EventTrigger } from '../entities/meta/event.js';
import { DebugInfo } from '../entities/ui/debug-info.js';
import { ChatWindow } from '../entities/ui/chat-window/chat-window.js';
import { AreaInfo } from '../entities/ui/area-info.js';
import { MapEditor } from '../entities/ui/map-editor/map-editor.js';
import { Menu } from '../entities/ui/menu.js';
import { Truck } from '../entities/object/truck.js';
import { BlueGuy } from '../entities/npc/blue-guy/blue-guy.js';
import { Electra } from '../entities/npc/electra/electra.js';
import { Bee } from '../entities/npc/bee/bee.js';
import { Pet } from '../entities/npc/pet/pet.js';

import { MusicEmitter } from '../components/music-emitter.js';

export class StartScene extends Scene {
  map = StartMap;
  // music = new MusicEmitter('null');

  initialize() {
    super.initialize();

    addEntities([
      // new EventTrigger(300, 300),
      // new Truck(),
      // new BlueGuy(),
      new Electra(600, 200),
      // new Pet(900, 400),
      new Player(400, 400),
      // new Bee(400, 450),
      new Menu(),
      new ChatWindow(),
      new AreaInfo(),
      // new DebugInfo(16, 16),
    ]);
  }
}

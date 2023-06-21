import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { StartMap } from '../maps/start.js';

import { DebugInfo } from '../entities/debug-info.js';
import { Player } from '../entities/player/player.js';
import { ChatWindow } from '../entities/chat-window/chat-window.js';
import { AreaInfo } from '../entities/area-info.js';
import { EventTrigger } from '../entities/event.js';
import { Truck } from '../entities/truck.js';
import { BlueGuy } from '../entities/blue-guy/blue-guy.js';
import { Electra } from '../entities/electra/electra.js';
import { Bee } from '../entities/bee/bee.js';
import { Menu } from '../entities/menu.js';
import { Pet } from '../entities/pet/pet.js';

import { MusicEmitter } from '../components/music-emitter.js';
import { MapEditor } from '../entities/map-editor/map-editor.js';

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

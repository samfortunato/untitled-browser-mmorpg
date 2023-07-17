import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';

import { EmeraldRunMap } from '../maps/emerald-run.js';

import { Player } from '../entities/meta/player/player.js';
import { UI } from '../entities/ui/ui.js';

export class EmeraldRunScene extends Scene {
  map = EmeraldRunMap;

  initialize() {
    addEntities([
      new Player(100, 100),
      new UI(),
    ]);
  }
}

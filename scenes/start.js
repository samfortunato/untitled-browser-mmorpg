import { addEntities } from '../engine/entity.js';

import { Scene } from './scene.js';
import { EmeraldRunScene } from './emerald-run.js';

import { StartMap } from '../maps/start.js';

import { SceneWarp } from '../entities/meta/scene-warp.js';
import { Player } from '../entities/meta/player/player.js';
import { UI } from '../entities/ui/ui.js';
import { AreaInfo } from '../entities/ui/area-info.js';
import { Electra } from '../entities/npc/electra/electra.js';
import { DebugInfo } from '../entities/ui/debug-info.js';

import { Sword } from '../items/sword.js';

import { MusicEmitter } from '../components/music-emitter.js';
import { Collider } from '../components/collider.js';

import { Position } from '../constructs/position.js';

/**
 * NOTES:
 * maybe make it so you don't have to import the UI in every scene.
 * make it auto update and draw somehow?
 */

export class StartScene extends Scene {
  map = StartMap;
  // music = new MusicEmitter('null');

  initialize() {
    super.initialize();

    addEntities([
      this.buildWarpToEmeraldRun(),
      new Electra(600, 200),
      new Sword(680, 225),
      new Player(400, 400),
      new UI(),
      new AreaInfo(),
      // new DebugInfo(),
    ]);
  }

  buildWarpToEmeraldRun() {
    const sceneWarp = new SceneWarp(
      0, 0,
      new EmeraldRunScene(),
      new Collider(0, 32, 32, 32),
      new Position(0, 0),
    );

    return sceneWarp;
  }
}

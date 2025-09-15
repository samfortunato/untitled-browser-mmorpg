import { entities } from '../engine/entity.js';

import { GameMap } from '../maps/game-map.js';

import { MusicEmitter } from '../components/music-emitter.js';

export class Scene {
  map = GameMap;
  // music = new MusicEmitter('somber');

  getMap() {
    return this.map;
  }

  initialize() {
    // this.music.loop();
  }

  update(dt) {
    // this.music.update();

    for (const entity of entities.values()) {
      entity.update(dt);
    }
  }

  draw(ctx, dt) {
    this.map.draw(ctx);

    for (const entity of entities.values()) {
      entity.draw(ctx, dt);
    }
  }
}

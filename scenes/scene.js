import { entities } from '../engine/entity.js';

import { GameMap } from '../maps/game-map.js';

import { MusicEmitter } from '../components/music-emitter.js';

import { Space } from '../constructs/space.js';

export class Scene {
  map = GameMap;
  space = new Space(0);
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
      if (!entity.isUI) entity.draw(ctx, dt);
    }

    for (const entity of entities.values()) {
      if (entity.isUI) entity.draw(ctx, dt);
    }
  }
}

import { allEntities } from '../engine/entity.js';

import { GameMap } from '../maps/game-map.js';

export class Scene {
  map = GameMap;

  getMap() {
    return this.map;
  }

  initialize() { }

  update(dt) {
    for (const entity of allEntities.values()) {
      entity.update(dt);
    }
  }

  draw(ctx) {
    this.map.draw(ctx);

    for (const entity of allEntities.values()) {
      entity.draw(ctx);
    }
  }
}

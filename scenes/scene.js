import { allEntities } from '../engine/entity.js';

export class Scene {
  initialize() { }

  update(dt) {
    for (const entity of allEntities.values()) {
      entity.update(dt);
    }
  }

  draw(ctx) {
    for (const entity of allEntities.values()) {
      entity.draw(ctx);
    }
  }
}

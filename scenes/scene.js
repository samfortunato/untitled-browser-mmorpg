import { allEntities } from '../engine/entity.js';

export class Scene {
  initialize() { }

  update() {
    for (const entity of allEntities.values()) {
      entity.update();
    }
  }

  draw(ctx) {
    for (const entity of allEntities.values()) {
      entity.draw(ctx);
    }
  }
}

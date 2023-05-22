import { destroyEntity } from '../engine/entity.js';

export class Entity {
  id = Symbol();
  pos = { x: 0, y: 0 };
  bounds = {
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  };

  constructor(x = 0, y = 0) {
    this.pos.x = x;
    this.pos.y = y;
  }

  update(dt) { }

  draw(ctx) { }

  destroy() {
    destroyEntity(this);
  }
}
